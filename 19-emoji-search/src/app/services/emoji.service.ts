import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Emoji } from '../models/emoji.model';

@Injectable({
  providedIn: 'root',
})
export class EmojiService {
  private emojisUrl =
    'https://cdn.jsdelivr.net/npm/unicode-emoji-json@0.8.0/data-by-group.json';

  constructor(private http: HttpClient) {}

  getEmojis(): Observable<Emoji[]> {
    return this.http.get<any[]>(this.emojisUrl).pipe(
      map((groups) =>
        groups.flatMap((group) =>
          group.emojis.map((emoji: any) => ({
            ...emoji,
            group: group.name,
          }))
        )
      )
    );
  }

  getCategories(emojis: Emoji[]): string[] {
    return [...new Set(emojis.map((emoji) => emoji.group))];
  }
}
