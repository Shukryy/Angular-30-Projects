import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Todo } from '../../models/todo.model';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { TodoService } from '../../services/todo.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-todos',
  imports: [CommonModule, FormsModule],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss',
})
export class TodosComponent implements OnInit {
  users: User[] = [];
  todos: Todo[] = [];
  selectedUser?: User;
  selectedUserId: number | string = '';
  newTodoTitle: string = '';
  currentEditingTodoId: number | null = null;
  currentEditingTodoTitle: string = '';

  constructor(
    private userService: UserService,
    private todoService: TodoService
  ) {}

  ngOnInit(): void {
    this.userService
      .fetchUsers()
      .pipe(
        catchError((error) => {
          console.error('Failed to fetch users:', error);
          return of([]);
        })
      )
      .subscribe((users) => {
        this.users = users;
      });
  }

  fetchTodos(userId: number): void {
    console.log('Fetching todos for user: ', userId);
    this.todoService.fetchTodos(userId).subscribe({
      next: (todos) => {
        this.todos = todos;
        console.log('Fetched todos:', this.todos);
      },
      error: (err) => console.error('Failed to fetch todos:', err),
    });
  }

  onUserSelect(): void {
    if (!this.selectedUserId) return;
    this.userService.findUserById(+this.selectedUserId).subscribe({
      next: (user) => {
        if (!user) {
          console.error('Selected user not found');
          return;
        }
        this.selectedUser = user;
        this.fetchTodos(this.selectedUser.id);
      },
      error: (err) => console.error('Error fetching user:', err),
    });
  }

  addTodo(): void {
    if (!this.newTodoTitle.trim() || !this.selectedUser) {
      alert('Please select a user and enter a todo title');
      return;
    }

    const newTodo = {
      userId: this.selectedUser.id,
      title: this.newTodoTitle,
      completed: false,
    };

    this.todoService.addTodo(newTodo);
    this.todos = this.todoService.getTodos();
    this.newTodoTitle = '';
  }

  deleteTodo(todoId: number): void {
    this.todoService.deleteTodo(todoId);
    this.todos = this.todoService.getTodos();
  }

  openEditModal(todo: Todo): void {
    this.currentEditingTodoId = todo.id;
    this.currentEditingTodoTitle = todo.title;
  }

  saveChanges(updatedTitle: string): void {
    if (this.currentEditingTodoId && updatedTitle.trim()) {
      this.todoService.editTodoById(this.currentEditingTodoId, {
        title: updatedTitle,
      });
      this.todos = this.todoService.getTodos();
      this.currentEditingTodoId = null;
      this.currentEditingTodoTitle = '';
    }
  }
}
