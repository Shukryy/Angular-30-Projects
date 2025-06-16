import { Component, OnInit } from '@angular/core';
import { UsercardComponent } from '../usercard/usercard.component';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-users',
  imports: [UsercardComponent, CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {
  constructor(public userService: UserService) {}

  ngOnInit() {
    this.userService.fetchUsers().subscribe({
      next: () => {
        console.log('Users  fetched successfully');
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      },
    });
  }

  onDeleteUser(userId: number) {
    this.userService.deleteUser(userId);
  }

  onAddUser(newUser: Partial<User>) {
    this.userService.addUser(newUser);
  }

  onUpdateUser(updatedUser: User) {
    this.userService.editUserById(updatedUser.id, updatedUser);
  }
}
