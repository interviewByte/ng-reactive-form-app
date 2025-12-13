import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormOneComponent } from './components/form-one/form-one.component';

const routes: Routes = [
  {
    path: 'reactive-form',
    component: FormOneComponent,
  },
  {
    path: '',
    component: FormOneComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
