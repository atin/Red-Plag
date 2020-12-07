import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './helpers/auth.guard';
import { LogoutGuard } from './helpers/logout.guard';
import { LoginComponent } from './login/login.component';
import { RegComponent } from './reg/reg.component';
import { HomeComponent } from './home/home.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [LogoutGuard] },
  { path: 'signup', component: RegComponent, canActivate: [LogoutGuard] },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
