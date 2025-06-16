import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _users: User[] = [];

  constructor(private http: HttpClient) {}

  fetchUsers(): Observable<User[]> {
    return this.http.get<User[]>(API_URL).pipe(
      map((rawUsers) => {
        this._users = rawUsers.map((user) => new User(user));
        return this._users;
      })
    );
  }

  getUsers(): User[] {
    return this._users;
  }

  addUser(newUser: Partial<User>): void {
    const userId = Math.max(0, ...this._users.map((user) => user.id)) + 1;
    const userInstance = new User({
      ...newUser,
      id: userId,
    });
    this._users.push(userInstance);
  }

  deleteUser(userId: number): void {
    this._users = this._users.filter((user) => user.id !== userId);
  }

  findUserById(userId: number): User | undefined {
    return this._users.find((user) => user.id === userId);
  }

  editUserById(userId: number, updatedUser: Partial<User>): User | undefined {
    const user = this.findUserById(userId);
    if (!user) {
      throw new Error(`User with id ${userId} not found.`);
    }
    Object.assign(user, updatedUser);
    return user;
  }
}
