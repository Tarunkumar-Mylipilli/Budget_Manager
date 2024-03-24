import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../dashboard/service.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SideNavComponent } from '../side-nav/sidenav.component';
@Component({
  selector: 'app-expense',
  standalone: true,
  imports: [SideNavComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.css'
})
  export class ExpenseComponent implements OnInit {
    expenseForm: FormGroup;
    expenses: any[] = [];
    selectedMonth: string = '';
    totalExpense: number = 0;
    editMode: boolean = false;
    editIndex: number = -1;
  
    constructor(private fb: FormBuilder, public service: ServiceService , public router:Router) {
      this.expenseForm = this.fb.group({
        month: ['', Validators.required],
        type: ['', Validators.required],
        amount: ['', Validators.required],
        text:['',Validators.required]
      });
    }
  
    ngOnInit(): void {
      this.loadExpenses();
    }
  
    loadExpenses(): void {
      // Load all expenses initially
      this.expenses = this.service.getAllExpenses();
      this.calculateTotalExpense();
    }
    goBack(): void {
      this.router.navigate(['/dashboard/all-transactions']);}
  
    calculateTotalExpense(): void {
      this.totalExpense = 0;
      for (const expense of this.expenses) {
        this.totalExpense += expense.amount;
      }
    }
  
    onSubmit(): void {
      if (this.expenseForm.valid) {
        const formValue = this.expenseForm.value;
        if (this.editMode) {
          this.expenses[this.editIndex] = formValue;
          this.editMode = false;
          this.editIndex = -1;
        } else {
          this.service.saveExpense(formValue);
        }
        
        this.loadExpenses();
        this.expenseForm.reset();
      }
    }
  
    onChangeMonth(): void {
      this.expenses = this.service.getExpensesByMonth(this.selectedMonth);
      this.calculateTotalExpense();
    }
  
    editExpense(index: number): void {
      const editedExpense = this.expenses[index];
      this.editMode = true;
      this.editIndex = index;
  
      this.expenseForm.patchValue({
        month: editedExpense.month,
        type: editedExpense.type,
        amount: editedExpense.amount,
        text: editedExpense.text
      });
    }
  
    deleteExpense(index: number): void {
      if (confirm('Are you sure you want to delete this expense?')) {
        this.service.deleteExpense(index);
        this.loadExpenses(); // Reload expenses after deletion
      }
    }
  }
