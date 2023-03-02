import { DashboardComponent } from './component/dashboard/dashboard.component';
// import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  { path:'', redirectTo:'login', pathMatch:'full'},
  {path:'login', component: LoginComponent },
  {path:"register", component: RegisterComponent },
  {path: 'home', component: DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents=[RegisterComponent, LoginComponent]

