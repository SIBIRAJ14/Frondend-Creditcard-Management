import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getCountries(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/countries`);
  }

  getStatesByCountry(countryId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/states/country/${countryId}`);
  }

  getCitiesByState(stateId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/cities/state/${stateId}`);
  }
}
