import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Emoji } from '../../models/emoji.model';
import { EmojiService } from '../../services/emoji.service';

@Component({
  selector: 'app-emoji-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './emoji-search.component.html',
  styleUrl: './emoji-search.component.scss',
})
export class EmojiSearchComponent implements OnInit {
  searchTerm = '';
  selectedCategory = '';
  emojis: Emoji[] = [];
  filteredEmojis: Emoji[] = [];
  categories: string[] = [];
  clipboardNotification: string | null = null;

  constructor(private emojiService: EmojiService) {}

  ngOnInit(): void {
    this.emojiService.getEmojis().subscribe((emojis: Emoji[]) => {
      this.emojis = emojis;
      this.filteredEmojis = [...emojis];
      this.categories = this.emojiService.getCategories(emojis);
    });
  }

  filterEmojis(): void {
    const search = this.searchTerm.toLowerCase();
    this.filteredEmojis = this.emojis.filter((emoji) => {
      const nameMatch = emoji.name.toLowerCase().includes(search);
      const groupMatch = this.selectedCategory
        ? emoji.group === this.selectedCategory
        : true;
      return nameMatch && groupMatch;
    });
  }

  onCategoryChange(): void {
    this.filterEmojis();
  }

  copyToClipboard(emojiChar: string): void {
    navigator.clipboard.writeText(emojiChar);
    this.clipboardNotification = `Copied "${emojiChar}" to clipboard`;
    setTimeout(() => {
      this.clipboardNotification = null;
    }, 3000);
  }
}
