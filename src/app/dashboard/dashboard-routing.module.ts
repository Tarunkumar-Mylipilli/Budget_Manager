import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AllTransactionsComponent } from './all-transactions/all-transactions.component';
import { SideNavComponent } from './side-nav/sidenav.component';
import { IncomeComponent } from './income/income.component';
import { ExpenseComponent } from './expense/expense.component';
import { AddBudgetComponent } from './add-budget/add-budget.component';
import { TodoTransactionsComponent } from './todo-transactions/todo-transactions.component';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'all-transactions',component:AllTransactionsComponent},
  {path:'side-nav',component:SideNavComponent},
  {path:'income',component:IncomeComponent},
  {path:'expense',component:ExpenseComponent},
  {path:'add-budget',component:AddBudgetComponent},
  {path:'todo-transactions',component:TodoTransactionsComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
