import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './helpers/auth.guard';
import { LoginComponent } from './login/login.component';
import { RegComponent } from './reg/reg.component';
import { HomeComponent } from './home/home.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: RegComponent },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
