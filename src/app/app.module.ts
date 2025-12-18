import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AsyncPipe } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormOneComponent } from './components/form-one/form-one.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GroupingFormComponent } from './components/grouping-form/grouping-form.component';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { BuildingDynamicFormComponent } from './components/building-dynamic-form/building-dynamic-form.component';
import { BuildingFormQuestionComponent } from './components/building-form-question/building-form-question.component';

@NgModule({
  declarations: [
    AppComponent,
    FormOneComponent,
    GroupingFormComponent,
    DynamicFormComponent,
    BuildingDynamicFormComponent,
    BuildingFormQuestionComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, AsyncPipe],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
