import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarService } from '../../services/calendar.service';

@Component({
  selector: 'app-day-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './day-card.component.html',
  styleUrls: ['./day-card.component.scss'],
})
export class DayCardComponent implements OnInit {
  @Input() day!: Date;
  isToday = false;
  isPast = false;
  bgImage = '';

  animeImages: string[] = [
    'https://miro.medium.com/v2/resize:fit:1069/1*VprqRiH9ec0E7VmOw17s_g.jpeg', // Solo Leveling
    'https://static0.gamerantimages.com/wordpress/wp-content/uploads/2024/12/one-piece-roronoa-zoro.jpg', // One Piece
    'https://static0.gamerantimages.com/wordpress/wp-content/uploads/2024/02/final-getsuga-tensho-ichigo-kurosaki-bleach.jpg', // Bleach
    'https://static.promediateknologi.id/crop/0x0:0x0/0x0/webp/photo/p2/243/2024/08/07/Kaiju-No-8-1-1085857383.jpg', // Kaiju No. 8
    'https://nerdreactor.com/wp-content/uploads/2024/07/blue-lock-isagi-1024x580.jpg', // Blue Lock
    'https://static1.srcdn.com/wordpress/wp-content/uploads/2025/05/naruto-s-sasuke-activating-his-sharingan.jpg', // Naruto
    'https://www.comboinfinito.com.br/principal/wp-content/uploads/2019/04/Produtor-fala-sobre-continua%C3%A7%C3%A3o-da-s%C3%A9rie-anime-de-Dragon-Ball-Super.jpg', // Dragon Ball
    'https://traditionalcatholicweeb.wordpress.com/wp-content/uploads/2024/04/frieren-beyond-journey-s-end-frieren.jpg?w=1108&h=737&crop=1', // Frieren
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSU1UoN_7JXqhsxprn-Gr9tx9ozhsHNfSwpfg&s', //tanjiro
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyLHk6fuR6_ZPRjGvJxDwTyvWjXtsvqWfwWQ&s',
    'https://images4.alphacoders.com/127/1279408.jpg', //anya
    'https://static1.cbrimages.com/wordpress/wp-content/uploads/2023/06/thorfinn-vinland-saga.jpg',
  ];

  constructor(private calendarService: CalendarService) {}

  ngOnInit(): void {
    const today = new Date();
    this.isToday = this.calendarService.isToday(this.day);
    this.isPast = this.calendarService.isPast(this.day);

    const index = this.day.getDate() % this.animeImages.length;
    this.bgImage = this.animeImages[index];
  }
}
