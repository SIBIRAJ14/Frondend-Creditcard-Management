import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  showAdminModal = false;
  message = '';

  constructor(private router: Router) {}

  isActive(route: string): boolean {
    return this.router.url === route;
  }

  goDashboard() {
    this.router.navigate(['/dashboard']);
  }

  goCustomers() {
    this.router.navigate(['/customers']);
  }

  goCreditCards() {
    const role = localStorage.getItem('role');
    if (role === 'ADMIN') {
      this.router.navigate(['/creditcards']);
    } else {
      this.message = 'This section is only accessible by administrators.';
      this.showAdminModal = true;
    }
  }

  goAbout() {
    this.router.navigate(['/about']);
  }

  closeModal() {
    this.showAdminModal = false;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }
}