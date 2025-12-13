import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormOneComponent } from './components/form-one/form-one.component';
import { GroupingFormComponent } from './components/grouping-form/grouping-form.component';

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
    path: 'group-form',
    component: GroupingFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
