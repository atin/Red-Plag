import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './helpers/auth.guard';
import { LoginComponent } from './login/login.component';
import { RegComponent } from './reg/reg.component';
import { UploadComponent } from './upload/upload.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: RegComponent },
  { path: 'upload', component: UploadComponent, canActivate: [AuthGuard]},
  { path: '**', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
