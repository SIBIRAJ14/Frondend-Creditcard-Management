import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreditCard {

  private baseUrl = 'http://localhost:8080/api/creditcards';

  constructor(private http: HttpClient) {}

  // ==============================
  // BASIC
  // ==============================

  greet(): Observable<string> {
    return this.http.get(`${this.baseUrl}/greet`, { responseType: 'text' });
  }

  test(body: string): Observable<string> {
    return this.http.post(`${this.baseUrl}/test`, body, { responseType: 'text' });
  }

  // ==============================
  // CREATE
  // ==============================

  addCard(card: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/add`, card);
  }

  // ==============================
  // READ
  // ==============================

  getAllCards(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/all`);
  }

  getCardById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  getCardsByStatus(status: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/status/${status}`);
  }

  getCardsByType(type: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/type/${type}`);
  }

  getCardsByCustomer(customerId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/customer/${customerId}`);
  }

  getCardsByIssueDate(date: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/issuedate/${date}`);
  }

  // ==============================
  // DELETE
  // ==============================

  deleteCard(id: number): Observable<string> {
    return this.http.delete(`${this.baseUrl}/${id}`, {
      responseType: 'text'
    });
  }

  // ==============================
  // UPDATE
  // ==============================

  updateCardStatus(id: number, status: string): Observable<string> {
    return this.http.put(
      `${this.baseUrl}/updateStatus/${id}`,
      { status: status },
      { responseType: 'text' }   // 🔥 VERY IMPORTANT
    );
  }



  // ==============================
  // COUNT
  // ==============================

  countCards(customerId: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count/${customerId}`);
  }

  // ==============================
  // LIMIT FILTERS
  // ==============================

  greaterThanLimit(amount: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/limit/greater/${amount}`);
  }

  lessThanLimit(amount: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/limit/less/${amount}`);
  }

  sortByLimitDesc(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/limit/sort/desc`);
  }

  limitRange(min: number, max: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/limit/range/${min}/${max}`);
  }

  maxLimit(customerId: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/limit/max/${customerId}`);
  }

  minLimit(customerId: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/limit/min/${customerId}`);
  }

  // ==============================
  // GROUP / SUMMARY
  // ==============================

  groupedTotals(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/group/totals`);
  }

  highTotals(limit: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/group/high/${limit}`);
  }

  getSummary(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/summary`);
  }

}
