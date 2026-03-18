import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CreditCard } from '../../Services/creditcard';

@Component({
  selector: 'app-creditcards',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './creditcards.html',
  styleUrl: './creditcards.css'
})
export class Creditcards implements OnInit {

  cards: any[] = [];
  filteredCards: any[] = [];

  searchId?: number;

  statusFilter = '';
  typeFilter = '';
  customerFilter?: number;
  issueDateFilter = '';

  // POPUPS
  showDeleteConfirm = false;
  showSuccessModal = false;
  showErrorModal = false;

  selectedCardId!: number;
  message = '';

  constructor(
    private creditCard: CreditCard,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadCards();
  }

  // ==============================
  // NORMALIZE API RESPONSE
  // ==============================
  normalizeCard(card: any) {

    // Normalize status
    card.status = card.status?.trim()?.toUpperCase();

    // Handle customer object response
    if (card.customer?.customerId) {
      card.customerId = card.customer.customerId;
    }

    // Handle snake_case response
    if (!card.customerId && card.customer_id) {
      card.customerId = card.customer_id;
    }

    return card;
  }

  // ==============================
  // LOAD ALL CARDS
  // ==============================
  loadCards(): void {

    this.creditCard.getAllCards().subscribe({
      next: (data) => {

        this.cards = data.map((c: any) => this.normalizeCard(c));
        this.filteredCards = [...this.cards];

        this.cd.detectChanges();
      },
      error: () => {
        this.message = 'Failed to load credit cards';
        this.showErrorModal = true;
      }
    });

  }

  // ==============================
  // SEARCH BY CARD ID
  // ==============================
  searchByCardId(): void {

    if (!this.searchId) {
      this.filteredCards = [...this.cards];
      return;
    }

    this.creditCard.getCardById(this.searchId).subscribe({
      next: (card) => {

        const normalized = this.normalizeCard(card);
        this.filteredCards = [normalized];

        this.cd.detectChanges();
      },
      error: () => {
        this.filteredCards = [];
      }
    });

  }

  // ==============================
  // FILTER BY STATUS
  // ==============================
  filterByStatus(): void {

    if (!this.statusFilter) {
      this.loadCards();
      return;
    }

    this.creditCard.getCardsByStatus(this.statusFilter)
      .subscribe(data => {

        this.filteredCards = data.map((c: any) => this.normalizeCard(c));
        this.cd.detectChanges();

      });

  }

  // ==============================
  // FILTER BY CARD TYPE
  // ==============================
  filterByType(): void {

    if (!this.typeFilter) {
      this.loadCards();
      return;
    }

    this.creditCard.getCardsByType(this.typeFilter)
      .subscribe(data => {

        this.filteredCards = data.map((c: any) => this.normalizeCard(c));
        this.cd.detectChanges();

      });

  }

  // ==============================
  // FILTER BY CUSTOMER
  // ==============================
  filterByCustomer(): void {

    if (!this.customerFilter) return;

    this.creditCard.getCardsByCustomer(this.customerFilter)
      .subscribe({
        next: (data) => {

          this.filteredCards = data.map((c: any) => this.normalizeCard(c));
          this.cd.detectChanges();

        },
        error: () => {
          this.filteredCards = [];
        }
      });

  }

  // ==============================
  // FILTER BY ISSUE DATE
  // ==============================
  filterByIssueDate(): void {

    if (!this.issueDateFilter) return;

    this.creditCard.getCardsByIssueDate(this.issueDateFilter)
      .subscribe(data => {

        this.filteredCards = data.map((c: any) => this.normalizeCard(c));
        this.cd.detectChanges();

      });

  }

  // ==============================
  // RESET SEARCH / FILTERS
  // ==============================
  resetSearch(): void {

    this.searchId = undefined;
    this.statusFilter = '';
    this.typeFilter = '';
    this.customerFilter = undefined;
    this.issueDateFilter = '';

    this.loadCards();
  }

  // ==============================
  // NAVIGATION
  // ==============================
  issueNew(): void {
    this.router.navigate(['/creditcards/add']);
  }

  // ==============================
  // TOGGLE CARD STATUS
  // ==============================
  toggleStatus(card: any) {

    const newStatus =
      card.status === 'ACTIVE'
        ? 'INACTIVE'
        : 'ACTIVE';

    this.creditCard.updateCardStatus(card.cardId, newStatus)
      .subscribe({
        next: (response) => {

          card.status = newStatus;

          this.message = response;
          this.showSuccessModal = true;

          this.cd.detectChanges();
        },
        error: (err) => {

          this.message =
            err?.error?.message ||
            err?.error ||
            'Status update failed';

          this.showErrorModal = true;
        }
      });

  }

  // ==============================
  // DELETE FLOW
  // ==============================
  openDeleteConfirm(id: number) {

    this.selectedCardId = id;
    this.showDeleteConfirm = true;

  }

  confirmDelete() {

    this.creditCard.deleteCard(this.selectedCardId)
      .subscribe({
        next: () => {

          this.showDeleteConfirm = false;
          this.message = 'Credit card deleted successfully';
          this.showSuccessModal = true;

          this.loadCards();
        },
        error: (err) => {

          this.showDeleteConfirm = false;
          this.message = err.error || 'Cannot delete credit card';
          this.showErrorModal = true;

        }
      });

  }

  closeModal() {

    this.showSuccessModal = false;
    this.showErrorModal = false;

  }

  cancelDelete() {

    this.showDeleteConfirm = false;

  }

}