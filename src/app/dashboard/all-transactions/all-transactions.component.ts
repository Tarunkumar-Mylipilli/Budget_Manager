import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SideNavComponent } from '../side-nav/sidenav.component';
@Component({
  selector: 'app-all-transactions',
  standalone: true,
  imports: [SideNavComponent,ReactiveFormsModule,CommonModule],
  templateUrl: './all-transactions.component.html',
  styleUrl: './all-transactions.component.css'
})
export class AllTransactionsComponent {
  transactions: any[] = [];
  lastThreeMonths: string[] = [];
  monthlyTotalIncome: any[] = [];
  

  constructor(public service: ServiceService,public router:Router) { }

  ngOnInit(): void {
    // Initialize last three months
    this.initializeLastThreeMonths();
    // Load transactions for the last three months
    this.loadTransactions();
  }

  initializeLastThreeMonths(): void {
    const currentDate = new Date();
    for (let i = 0; i < 3; i++) {
      const month = currentDate.toLocaleString('default', { month: 'long' });
      this.lastThreeMonths.unshift(month);
      currentDate.setMonth(currentDate.getMonth() - 1);
    }
  }
  addIncome(): void {
    this.router.navigate(['/dashboard/income']);}
    addExpense(): void {
      this.router.navigate(['/dashboard/expense'])}
  addBudget() : void {
    this.router.navigate(['./dashboard/add-budget'])}

  loadTransactions(): void {
    // Clear existing transactions
    this.transactions = [];
    this.monthlyTotalIncome = [];

    // Load transactions for the last three months
    for (const month of this.lastThreeMonths) {
      const monthIncomes = this.service.getIncomesByMonth(month);
      const monthExpenses = this.service.getExpensesByMonth(month);
      const monthBudgets = this.service.getBudgetsByMonth(month);

      // Push incomes
      this.transactions.push(...monthIncomes.map(income => ({
        ...income,
        type: 'Income', // Adding a type for differentiating income and expense
        category: income.source, // Assuming "source" as the category for incomes
      })));

      // Push expenses
      this.transactions.push(...monthExpenses.map(expense => ({
        ...expense,
        type: 'Expense', // Adding a type for differentiating income and expense
        category: expense.type, // Assuming "type" as the category for expenses
      })));

      // Push budgets
      this.transactions.push(...monthBudgets.map(budget => ({
        ...budget,
        type: 'Budget', // Adding a type for differentiating budgets
        category: budget.name, // Assuming "name" as the category for budgets
      })));

      // Calculate total income for the month
      const totalIncome = monthIncomes.reduce((acc, curr) => acc + curr.amount, 0);
      const totalExpense = monthExpenses.reduce((acc, curr) => acc + curr.amount, 0);
      const totalBudget = monthBudgets.length > 0 ? monthBudgets[0].amount : 0;
      // Assuming one budget per month
      let expenseDue = totalBudget - totalExpense;
      let remainingBalance = totalIncome - totalBudget
      
      
      
      // Adjust expense due if negative
      expenseDue = Math.max(expenseDue, 0);
      remainingBalance = Math.max(remainingBalance,0)

   this.monthlyTotalIncome.push({
     month,
     totalIncome,
     totalExpense,
     totalBudget,
     remainingBalance,
     expenseDue
   });
   
    }
  }
}
