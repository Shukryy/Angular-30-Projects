import { Component } from '@angular/core';
import { EmojiSearchComponent } from './components/emoji-search/emoji-search.component';
import { ThemePickerComponent } from './components/theme-picker/theme-picker.component';

@Component({
  selector: 'app-root',
  imports: [EmojiSearchComponent, ThemePickerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
