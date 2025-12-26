import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormOneComponent } from './components/form-one/form-one.component';
import { GroupingFormComponent } from './components/grouping-form/grouping-form.component';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { ScrollTableComponent } from './components/scroll-table/scroll-table.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {
    path: 'reactive-form',
    component: FormOneComponent,
  },
  {
    path: '',
    component: FormOneComponent,
  },
  {
    path: 'form-group',
    component: GroupingFormComponent,
  },
  {
    path: 'dynamic-form',
    component: DynamicFormComponent,
  },
  {
    path: 'table',
    component: ScrollTableComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
