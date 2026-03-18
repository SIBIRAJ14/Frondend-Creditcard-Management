import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from '../../../Services/customer';
import { LocationService } from '../../../Services/Location.service';

@Component({
  selector: 'app-addcustomers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './addcustomers.html',
  styleUrls: ['./addcustomers.css']
})
export class Addcustomers implements OnInit {

  model: any = {
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    countryId: null,
    stateId: null,
    cityId: null
  };

  countries: any[] = [];
  states: any[] = [];
  cities: any[] = [];

  loadingCountries = false;
  loadingStates = false;
  loadingCities = false;

  successMessage = '';
  errorMessage = '';
  showModal = false;

  constructor(
    private router: Router,
    private customer: Customer,
    private locationService: LocationService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadCountries();
  }

  // ---------------- VALIDATIONS ----------------

  isValidPhone(phone: string): boolean {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  isValidName(name: string): boolean {
    const nameRegex = /^[A-Za-z ]+$/;
    return nameRegex.test(name);
  }

  isAdult(date: string): boolean {
    const dob = new Date(date);
    const today = new Date();

    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }

    return age >= 18;
  }

  // Prevent numbers typing in Name field
  allowOnlyLetters(event: KeyboardEvent) {
    const key = event.key;
    if (!/^[a-zA-Z ]$/.test(key)) {
      event.preventDefault();
    }
  }

  // ---------------- LOAD COUNTRIES ----------------

  loadCountries() {
    this.loadingCountries = true;

    this.locationService.getCountries().subscribe({
      next: (data) => {
        this.countries = data;
        this.loadingCountries = false;
        this.cd.detectChanges();
      },
      error: () => {
        this.loadingCountries = false;
        this.errorMessage = 'Failed to load countries';
      }
    });
  }

  // ---------------- COUNTRY CHANGE ----------------

  onCountryChange() {

    if (!this.model.countryId) return;

    this.states = [];
    this.cities = [];
    this.model.stateId = null;
    this.model.cityId = null;

    this.loadingStates = true;

    this.locationService.getStatesByCountry(this.model.countryId)
      .subscribe({
        next: (data) => {
          this.states = data;
          this.loadingStates = false;
          this.cd.detectChanges();
        },
        error: () => {
          this.loadingStates = false;
          this.errorMessage = 'Failed to load states';
        }
      });
  }

  // ---------------- STATE CHANGE ----------------

  onStateChange() {

    if (!this.model.stateId) return;

    this.cities = [];
    this.model.cityId = null;

    this.loadingCities = true;

    this.locationService.getCitiesByState(this.model.stateId)
      .subscribe({
        next: (data) => {
          this.cities = data;
          this.loadingCities = false;
          this.cd.detectChanges();
        },
        error: () => {
          this.loadingCities = false;
          this.errorMessage = 'Failed to load cities';
        }
      });
  }

  // ---------------- SAVE ----------------

  save(form: NgForm) {

    this.errorMessage = '';

    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    if (!this.isValidName(this.model.name)) {
      this.errorMessage = 'Name should contain only letters';
      return;
    }

    if (!this.isValidEmail(this.model.email)) {
      this.errorMessage = 'Invalid email format';
      return;
    }

    if (!this.isValidPhone(this.model.phone)) {
      this.errorMessage = 'Phone number must be 10 digits';
      return;
    }

    if (!this.isAdult(this.model.dateOfBirth)) {
      this.errorMessage = 'Customer must be at least 18 years old';
      return;
    }

    this.customer.addCustomer(this.model).subscribe({
      next: () => {
        this.successMessage = 'Customer added successfully';
        this.showModal = true;
        form.resetForm();
        this.cd.detectChanges();
      },
      error: (err) => {
        if (err.status === 409) {
          this.errorMessage = 'Email already exists';
        } else {
          this.errorMessage = 'Error while adding customer';
        }
        this.cd.detectChanges();
      }
    });
  }

  closeModal() {
    this.showModal = false;
    this.router.navigate(['/customers']);
  }

  cancel() {
    this.router.navigate(['/customers']);
  }
}