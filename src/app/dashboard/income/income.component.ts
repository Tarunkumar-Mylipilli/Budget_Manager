import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServiceService } from '../service.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SideNavComponent } from '../side-nav/sidenav.component';

@Component({
  selector: 'app-income',
  standalone: true,
  imports: [SideNavComponent,CommonModule,ReactiveFormsModule],
  templateUrl: './income.component.html',
  styleUrl: './income.component.css'
})
export class IncomeComponent implements OnInit {
  incomeForm: FormGroup;
  incomes: any[] = [];
  selectedMonth: string = '';
  totalIncome: number = 0;
  editMode: boolean = false;
  editIndex: number = -1;

  constructor(private fb: FormBuilder, public service: ServiceService, public router:Router) {
    this.incomeForm = this.fb.group({
      month: ['', Validators.required],
      source: ['', Validators.required],
      amount: ['', Validators.required],
      investments: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadIncomes();
  }

  loadIncomes(): void {
    // Load all incomes initially
    this.incomes = this.service.getAllIncomes();
    this.calculateTotalIncome();
  }
  goBack(): void {
    this.router.navigate(['/dashboard/all-transactions']);}

  calculateTotalIncome(): void {
    this.totalIncome = 0;
    for (const income of this.incomes) {
      this.totalIncome += income.amount;
    }
  }
  onSubmit(): void {
    if (this.incomeForm.valid) {
      const formValue = this.incomeForm.value;
      if (this.editMode) {
        this.incomes[this.editIndex] = formValue;
        this.editMode = false;
        this.editIndex = -1;
      } else {
        this.service.saveIncome(formValue);
      }
      
      this.loadIncomes();
      this.incomeForm.reset();
    }
  }

  onChangeMonth(): void {
    this.incomes = this.service.getIncomesByMonth(this.selectedMonth);
    this.calculateTotalIncome();
  }

  saveToLocalStorage(): void {
    localStorage.setItem('incomes', JSON.stringify(this.incomes));
  }
  editIncome(index: number): void {
    const editedIncome = this.incomes[index];
    this.editMode = true;
    this.editIndex = index;

    this.incomeForm.patchValue({
      month: editedIncome.month,
      source: editedIncome.source,
      amount: editedIncome.amount,
      investments: editedIncome.investments
    });
  }
  deleteIncome(index: number): void {
    if (confirm('Are you sure you want to delete this income?')) {
      this.service.deleteIncome(index);
      this.loadIncomes(); // Reload incomes after deletion
    }
  }
}

