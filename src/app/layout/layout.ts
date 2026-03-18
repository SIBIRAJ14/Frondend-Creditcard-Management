import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, NavigationEnd, Router } from '@angular/router';
import { Sidebar } from './sidebar/sidebar';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, Sidebar],
  templateUrl: './layout.html',
  styleUrls: ['./layout.css']
})
export class Layout {
  pageTitle = 'Dashboard';

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.setPageTitle(event.url);
    });
  }

  setPageTitle(url: string) {
    if (url.includes('dashboard')) this.pageTitle = 'Dashboard';
    else if (url.includes('customers')) this.pageTitle = 'Customers';
    else if (url.includes('creditcards')) this.pageTitle = 'Credit Cards';
    else if (url.includes('about')) this.pageTitle = 'About';
    else this.pageTitle = 'Dashboard';
  }
}