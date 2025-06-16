import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PwnedPasswordCheckerService {
  constructor(private http: HttpClient) {}

  // generate sha-1 hash for password
  sha1(password: string): string {
    return CryptoJS.SHA1(password).toString(CryptoJS.enc.Hex).toUpperCase();
  }

  // Extract prefix ( first 5 characters) from hash
  getHashPrefix(hash: string): string {
    return hash.slice(0, 5);
  }

  // Extract suffix(remaining chaacters) from hash
  getHashSuffix(hash: string): string {
    return hash.slice(5);
  }

  // checks if suffix exist
  queryPwnedPasswordsAPI(prefix: string): Observable<string> {
    return this.http.get(`https://api.pwnedpasswords.com/range/${prefix}`, {
      responseType: 'text',
    });
  }

  isPasswordPwned(suffix: string, response: string): boolean {
    const hashes = response.split('\n'); // split to next line
    // check for matching suffix
    return hashes.some((hash) => hash.startsWith(suffix));
  }

  checkPassword(password: string): Observable<boolean | 'error'> {
    // default false for empty passwords
    if (!password) return of(false);

    // Generate sha-1 hash
    const sha1Hash = this.sha1(password);
    // Extract the prefix
    const prefix = this.getHashPrefix(sha1Hash);
    // Extract the suffix
    const suffix = this.getHashSuffix(sha1Hash);

    return this.queryPwnedPasswordsAPI(prefix).pipe(
      map((response) => this.isPasswordPwned(suffix, response)),
      catchError(() => of<'error'>('error'))
    );
  }
}
