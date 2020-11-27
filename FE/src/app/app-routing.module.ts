import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UsersComponent } from './components/users/users.component';
import { AuthGuardService as AuthGuard } from "./auth/auth-guard.service";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'register',
    pathMatch: 'full'
  },
  {
    component: RegisterComponent,
    path: "register"
  },
  {
    component: LoginComponent,
    path: "login"
  },
  { 
    canActivate: [AuthGuard],
    component: UsersComponent,
    path: "users"
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
