import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CreditCard } from '../../../Services/creditcard';

@Component({
  selector: 'app-addcards',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './addcards.html',
  styleUrls: ['./addcards.css']
})
export class Addcards {

  model: any = {
    customerId: null,
    cardType: '',
    status: 'ACTIVE',
    issueDate: '',
    creditLimit: null
  };

  cardLimits: any = {
    SILVER: 50000,
    GOLD: 200000,
    PLATINUM: 500000,
    DIAMOND: 1000000
  };

  successMessage = '';
  errorMessage = '';
  showModal = false;

  constructor(
    private router: Router,
    private creditService: CreditCard,
    private cd: ChangeDetectorRef
  ) {}

  // 🔥 AUTO CREDIT LIMIT
  onCardTypeChange() {
    const type = this.model.cardType?.toUpperCase();

    if (this.cardLimits[type]) {
      this.model.creditLimit = this.cardLimits[type];
    } else {
      this.model.creditLimit = null;
    }
  }

  save(form: NgForm) {

    this.errorMessage = '';

    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    this.creditService.addCard(this.model).subscribe({
      next: () => {
        this.successMessage = 'Credit Card Issued Successfully';
        this.showModal = true;

        form.resetForm();
        this.model.status = 'ACTIVE';

        this.cd.detectChanges();
      },
      error: (err) => {

        if (err.status === 400) {
          this.errorMessage = err.error;   // 🔥 Shows "Customer not found"
        } else {
          this.errorMessage = 'Error while issuing card';
        }

        this.cd.detectChanges();
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
