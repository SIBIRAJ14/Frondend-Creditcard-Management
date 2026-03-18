import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

  cardPlans = [
    {
      name: 'Silver',
      price: '₹499 / year',
      limit: '₹50,000',
      benefits: [
        'Basic rewards',
        'Domestic usage',
        'Email support'
      ],
      color: 'silver'
    },
    {
      name: 'Gold',
      price: '₹999 / year',
      limit: '₹2,00,000',
      benefits: [
        'Cashback offers',
        'Dining discounts',
        'Priority support'
      ],
      color: 'gold'
    },
    {
      name: 'Platinum',
      price: '₹2,499 / year',
      limit: '₹5,00,000',
      benefits: [
        'Airport lounge access',
        'Travel insurance',
        '24/7 concierge'
      ],
      color: 'platinum'
    },
    {
      name: 'Diamond',
      price: '₹4,999 / year',
      limit: '₹10,00,000',
      benefits: [
        'Unlimited lounge access',
        'Premium insurance',
        'Dedicated relationship manager'
      ],
      color: 'diamond'
    }
  ];

}
