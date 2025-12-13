import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormOneComponent } from './components/form-one/form-one.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GroupingFormComponent } from './components/grouping-form/grouping-form.component';

@NgModule({
  declarations: [AppComponent, FormOneComponent, GroupingFormComponent],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
