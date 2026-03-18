import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CreditCard } from '../../../Services/creditcard';

@Component({
  selector: 'app-updatecards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './updatecards.html',
  styleUrls: ['./updatecards.css']
})
export class Updatecards implements OnInit {

  cardId!: number;

  card: any = {
    customerId: null,
    cardType: '',
    status: '',
    creditLimit: null,
    issueDate: ''
  };

  loading = true;

  successMessage = '';
  errorMessage = '';
  showModal = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private creditService: CreditCard,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cardId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadCard();
  }

  // ---------------- LOAD CARD ----------------

loadCard() {
  this.creditService.getCardById(this.cardId).subscribe({
    next: (data: any) => {

      this.card = {
        customerId: data.customerId?.customerId || data.customerId,
        cardType: data.cardType,
        status: data.status?.toUpperCase(),
        creditLimit: data.creditLimit,
        issueDate: data.issueDate
      };

      this.loading = false;
      this.cd.detectChanges();
    },
    error: () => {
      this.errorMessage = 'Failed to load card';
      this.loading = false;
    }
  });
}


  // ---------------- TOGGLE STATUS ----------------

  toggleStatus() {

    const newStatus =
      this.card.status === 'ACTIVE'
        ? 'INACTIVE'
        : 'ACTIVE';

    this.creditService.updateCardStatus(
      this.cardId,
      newStatus
    ).subscribe({
      next: () => {

        this.card.status = newStatus;

        this.successMessage = 'Card status updated successfully';
        this.showModal = true;

        this.cd.detectChanges();
      },
      error: (err) => {
        this.errorMessage = err.error || 'Update failed';
      }
    });
  }

  closeModal() {
    this.showModal = false;
    this.router.navigate(['/creditcards']);
  }

  cancel() {
    this.router.navigate(['/creditcards']);
  }
}
