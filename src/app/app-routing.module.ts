import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditionComponentComponent } from './edition-component/edition-component.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: '', component: UserComponent},
  { path: 'edition', component: EditionComponentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
