import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CurrencyConverterService } from '../services/currency-converter.service';

@Component({
  selector: 'app-currency-converter',
  standalone: true,
  imports: [CommonModule, FormsModule, CurrencyPipe],
  templateUrl: './currency-converter.component.html',
  styleUrl: './currency-converter.component.scss',
})
export class CurrencyConverterComponent {
  amount: number = 0;
  sourceCurrency: string = 'USD';
  targetCurrency: string = 'EUR';
  result: number = 0;
  conversionRate: number | null = null;
  isLoading: boolean = false;
  hasError: boolean = false;

  currencies: string[] = ['USD', 'EUR', 'GBP', 'INR', 'JPY', 'MYR'];
  currencyFlags: { [key: string]: string } = {
    USD: '🇺🇸',
    EUR: '🇪🇺',
    GBP: '🇬🇧',
    INR: '🇮🇳',
    JPY: '🇯🇵',
    MYR: '🇲🇾',
  };

  constructor(private currencyConverterService: CurrencyConverterService) {}

  convertCurrency() {
    if (!this.amount || this.amount <= 0) {
      this.result = 0;
      this.conversionRate = null;
      return;
    }

    this.isLoading = true;
    this.hasError = false;

    this.currencyConverterService
      .getConversionRate(this.sourceCurrency, this.targetCurrency, this.amount)
      .subscribe((result) => {
        this.isLoading = false;

        if (result === null) {
          this.result = 0;
          this.hasError = true;
        } else {
          this.result = result;
          this.conversionRate = result / this.amount;
        }
      });
  }

  getFlagAndCurrency(currency: string): string {
    return `${this.currencyFlags[currency] || ''} ${currency}`;
  }
}
