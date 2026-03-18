import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from '../../../Services/customer';
import { LocationService } from '../../../Services/Location.service';

@Component({
  selector: 'app-updatecustomers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './updatecustomers.html',
  styleUrls: ['./updatecustomers.css']
})
export class Updatecustomers implements OnInit {

  customerId!: number;

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

  loading = true;

  successMessage = '';
  errorMessage = '';
  showModal = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private customer: Customer,
    private locationService: LocationService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.customerId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadCountries();
  }

  // ----------- BLOCK NUMBERS IN NAME -----------

  allowOnlyLetters(event: KeyboardEvent) {
    const regex = /^[A-Za-z ]$/;
    if (!regex.test(event.key)) {
      event.preventDefault();
    }
  }

  validateName() {
    this.model.name = this.model.name.replaceAll(/[^A-Za-z ]/g, '');
  }

  // ----------- VALIDATIONS -----------

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

  // ----------- LOAD COUNTRIES -----------

  loadCountries() {
    this.locationService.getCountries().subscribe({
      next: (countries) => {
        this.countries = countries;
        this.loadCustomer();
      },
      error: () => {
        this.errorMessage = 'Failed to load countries';
      }
    });
  }

  // ----------- LOAD CUSTOMER -----------

  loadCustomer() {
    this.customer.getCustomerById(this.customerId).subscribe({
      next: (data: any) => {
        this.model = {
          name: data.name,
          email: data.email,
          phone: data.phone,
          dateOfBirth: data.dateOfBirth,
          countryId: data.countryId,
          stateId: data.stateId,
          cityId: data.cityId
        };

        this.loadStates(data.countryId, data.stateId, data.cityId);
      },
      error: () => {
        this.errorMessage = 'Failed to load customer';
      }
    });
  }

  loadStates(countryId: number, selectedStateId?: number, selectedCityId?: number) {
    this.locationService.getStatesByCountry(countryId).subscribe({
      next: (states) => {
        this.states = states;

        if (selectedStateId) {
          this.model.stateId = selectedStateId;
          this.loadCities(selectedStateId, selectedCityId);
        } else {
          this.loading = false;
        }

        this.cd.detectChanges();
      }
    });
  }

  loadCities(stateId: number, selectedCityId?: number) {
    this.locationService.getCitiesByState(stateId).subscribe({
      next: (cities) => {
        this.cities = cities;

        if (selectedCityId) {
          this.model.cityId = selectedCityId;
        }

        this.loading = false;
        this.cd.detectChanges();
      }
    });
  }

onCountryChange() {

  if (!this.model.countryId) return;

  this.states = [];
  this.cities = [];
  this.model.stateId = null;
  this.model.cityId = null;

  this.locationService.getStatesByCountry(this.model.countryId)
    .subscribe({
      next: (states) => {
        this.states = states;
        this.cd.detectChanges();   // 🔥 ADD THIS
      }
    });
}


onStateChange() {

  if (!this.model.stateId) return;

  this.cities = [];
  this.model.cityId = null;

  this.locationService.getCitiesByState(this.model.stateId)
    .subscribe({
      next: (cities) => {
        this.cities = cities;
        this.cd.detectChanges();   // 🔥 ADD THIS
      }
    });
}


  // ----------- UPDATE -----------

  update(form: NgForm) {

    this.errorMessage = '';

    if (form.invalid || !this.isAdult(this.model.dateOfBirth)) {
      form.control.markAllAsTouched();
      return;
    }

    this.customer.updateCustomer(this.customerId, this.model)
      .subscribe({
        next: () => {
          this.successMessage = 'Customer updated successfully';
          this.showModal = true;
          this.cd.detectChanges();
        },
        error: (err) => {
          if (err.status === 409) {
            this.errorMessage = 'Email already exists';
          } else {
            this.errorMessage = 'Update failed';
          }
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
