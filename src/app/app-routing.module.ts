import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormOneComponent } from './components/form-one/form-one.component';
import { GroupingFormComponent } from './components/grouping-form/grouping-form.component';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { BuildingDynamicFormComponent } from './components/building-dynamic-form/building-dynamic-form.component';
import { ScrollTableComponent } from './components/scroll-table/scroll-table.component';
import { ParentComponent } from './components/parent/parent.component';
import { FormBuilderServiceComponent } from './form-builder-service/form-builder-service.component';

const routes: Routes = [
  {
    path: 'reactive-form',
    component: FormOneComponent,
  },
  {
    path: 'form-builder-service',
    component: FormBuilderServiceComponent,
  },
  {
    path: '',
    component: ParentComponent,
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
    path: 'parent',
    component: ParentComponent,
  },
];
@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule {}
