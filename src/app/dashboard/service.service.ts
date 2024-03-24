import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  incomes: any[] = [];
  expenses: any[] = [];
  budgets:any [] = [];
  constructor() {
    this.expenses = [
      { id: 1, month: 'January', type: 'Rent', amount: 1000 ,text:'paying this month rent'},
      { id: 2, month: 'February', type: 'Groceries', amount: 500, text:'payy for the kitchen utilities' },
      { id: 1, month: 'March', type: 'Rent', amount: 1000, text:'pay this month rent' },
      { id: 2, month: 'April', type: 'Groceries', amount: 500 , text:'payy for the kitchen utilities' },
      { id: 1, month: 'May', type: 'Rent', amount: 1000 , text:'pay this month rent'},
      { id: 2, month: 'June', type: 'Groceries', amount: 500, text:'payy for the kitchen utilities'  },
      { id: 1, month: 'July', type: 'Rent', amount: 1000, text:'pay this month rent' },
      { id: 2, month: 'August', type: 'Groceries', amount: 500, text:'payy for the kitchen utilities'  },
      { id: 1, month: 'Sepetember', type: 'Rent', amount: 1000, text:'pay this month rent' },
      { id: 2, month: 'October', type: 'Groceries', amount: 500, text:'payy for the kitchen utilities'  },
      { id: 1, month: 'November', type: 'Rent', amount: 1000, text:'pay this month rent' },
      { id: 2, month: 'December', type: 'Groceries', amount: 500, text:'payy for the kitchen utilities'  },
      // Add more expenses as needed
    ];
    this.incomes = [
      { id: 1, month: 'January', source: 'Salary', amount: 30000 ,investments:'401(k)'},
      { id: 2, month: 'February', source: 'Salary', amount: 30000, investments:'stocks' },
      { id: 1, month: 'March', source: 'Salary', amount: 30000, investments:'401(k)' },
      { id: 2, month: 'April', source: 'Rental Income', amount: 7000 , investments:'stocks' },
      { id: 1, month: 'May', source: 'Salary', amount: 30000 , investments:'401(k)'},
      { id: 2, month: 'June', source: 'Rental Income', amount: 7000, investments:'stocks'  },
      { id: 1, month: 'July', source: 'Salary', amount: 30000, investments:'401(k)' },
      { id: 2, month: 'August', source: 'Rental Income', amount: 7000, investments:'stocks'  },
      { id: 1, month: 'Sepetember', source: 'Salary', amount: 30000, investments:'401(k)' },
      { id: 2, month: 'October', source: 'Rental Income', amount: 7000, investments:'stocks'  },
      { id: 1, month: 'November', source: 'Salary', amount: 30000, investments:'401(k)' },
      { id: 2, month: 'December', source: 'Rental Income', amount: 7000, investments:'stocks'  },
      // Add more expenses as needed
    ];
    this.budgets = [
      { id: 1, month: 'January', name: 'Monthly Rent', amount: 100000 },
      { id: 2, month: 'February', name: 'Groceries', amount: 50000 },
      { id: 3, month: 'March', name: 'Utilities', amount: 300 },
      // Add more budgets as needed
    ];
   }

  getAllIncomes(): any[] {
    return this.incomes;
  }
  getAllExpenses(): any[]{
    return this.expenses
  }
  getAllBudgets(): any []{
    return this.budgets
  }

  saveIncome(income: any): void {
    this.incomes.push(income);
  }
  saveExpense(expense:any): void {
    this.expenses.push(expense)
  }
  saveBudget(budget: any): void {
    this.budgets.push(budget);
  }

  getIncomesByMonth(month: string): any[] {
    return this.incomes.filter(income => income.month === month);
  }
  getExpensesByMonth(month: string): any[] {
    return this.expenses.filter(expense => expense.month === month);
  }
  getBudgetsByMonth(month: string): any[] {
    return this.budgets.filter(budget => budget.month === month);
  }
  getMonths(): string[] {
    // Assuming you have a fixed list of months
    return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  }
 
  deleteIncome(index: number): void {
    this.incomes.splice(index, 1);
    // You might want to update the server or localStorage here
  }
  deleteExpense(index: number): void {
    this.expenses.splice(index, 1);
    // You might want to update the server or localStorage here
  }

  deleteBudget(index: number): void {
    if (index >= 0 && index < this.budgets.length) {
      this.budgets.splice(index, 1);
    }
  }

  

  
  // updateBudget(index: number, updatedBudget: any): void {
  //   if (index >= 0 && index < this.budgets.length) {
  //     this.budgets[index] = updatedBudget;
  //   }
  // }
  


}
