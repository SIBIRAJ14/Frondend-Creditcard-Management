import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from '../../Services/customer';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './customers.html',
  styleUrl: './customers.css'
})
export class Customers implements OnInit {

  customers: any[] = [];
  filteredCustomers: any[] = [];

  showSearch = false;
  searchId?: number;

  // 🔥 POPUP VARIABLES
  showDeleteConfirm = false;
  showSuccessModal = false;
  showErrorModal = false;

  selectedCustomerId!: number;
  message = '';

  constructor(
    private customer: Customer,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customer.getAllCustomers().subscribe({
      next: (data) => {
        this.customers = data;
        this.filteredCustomers = [...data];
        this.cd.detectChanges();
      }
    });
  }

  // ---------------- SEARCH ----------------

  toggleSearch(): void {
    this.showSearch = !this.showSearch;
    this.filteredCustomers = [...this.customers];
    this.searchId = undefined;
  }

searchCustomerById(): void {
  if (!this.searchId) {
    this.filteredCustomers = [...this.customers];
    return;
  }

  const found = this.customers.find(
    c => c.customerId === Number(this.searchId)
  );

  this.filteredCustomers = found ? [found] : [];
}

  resetSearch(): void {
    this.filteredCustomers = [...this.customers];
    this.searchId = undefined;
    this.showSearch = false;
  }

  // ---------------- NAVIGATION ----------------

  addCustomer(): void {
    this.router.navigate(['/customers/add']);
  }

  editCustomer(id: number): void {
    this.router.navigate(['/customers/update', id]);
  }

// ---------------- DELETE FLOW ----------------

openDeleteConfirm(id: number) {
  this.selectedCustomerId = id;
  this.showDeleteConfirm = true;
}

confirmDelete() {
  this.customer.deleteCustomer(this.selectedCustomerId).subscribe({
    next: () => {
      this.showDeleteConfirm = false;

      this.message = 'Customer deleted successfully';
      this.showSuccessModal = true;

      this.loadCustomers();   

      this.cd.detectChanges();
    },
    error: (err) => {
      this.showDeleteConfirm = false;

      console.error('Delete error:', err); 

      this.message = 'Cannot delete customer';
      this.showErrorModal = true;

      this.cd.detectChanges();
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