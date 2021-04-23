import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { EditionComponentComponent } from './edition-component/edition-component.component';
import { LoginComponent } from './auth/login/login.component';
import { UserComponent } from './user/user.component';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from './services/auth/auth.guard';

const routes: Routes = [

  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'create', component: LayoutComponent, canActivate: [AuthGuard] },
  { path: 'edition', component: EditionComponentComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
