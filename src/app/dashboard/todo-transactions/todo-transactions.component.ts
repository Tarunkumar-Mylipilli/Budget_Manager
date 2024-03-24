import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavComponent } from '../side-nav/sidenav.component';


interface TodoItem {
  title: string;
  description: string;
} 


@Component({
  selector: 'app-todo-transactions',
  standalone: true,
  imports: [SideNavComponent,CommonModule],
  templateUrl: './todo-transactions.component.html',
  styleUrl: './todo-transactions.component.css'
})

export class TodoTransactionsComponent {
  todoItems: TodoItem[] = [
    { title: 'Task 1', description: 'Description for Task 1' },
    { title: 'Task 2', description: 'Description for Task 2' },
    { title: 'Task 3', description: 'Description for Task 3' }
  ];

}
