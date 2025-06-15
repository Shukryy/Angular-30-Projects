import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CurrencyConverterService {
  private apiUrl = 'https://api.exchangerate.host';
  private apiKey = environment.exchangeRateApiKey;

  constructor(private http: HttpClient) {}

  getConversionRate(
    source: string,
    target: string,
    amount: number
  ): Observable<number | null> {
    if (source === target) return of(amount);

    const url = `${this.apiUrl}/convert?from=${source}&to=${target}&amount=${amount}&access_key=${this.apiKey}`;

    return this.http.get<any>(url).pipe(
      map((res) => (res?.result ? res.result : null)),
      catchError((err) => {
        console.error('Error fetching conversion rate:', err);
        return of(null);
      })
    );
  }
}
