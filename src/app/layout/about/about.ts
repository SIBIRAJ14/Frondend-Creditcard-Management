import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
  appName = 'CardFlex';
  version = '1.0.0';

  features = [
    'Customer Management',
    'Credit Card Issuance',
    'Search by ID',
    'Secure Dashboard',
    'Modern UI with Angular'
  ];

}


