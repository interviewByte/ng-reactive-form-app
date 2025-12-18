import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormOneComponent } from './components/form-one/form-one.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GroupingFormComponent } from './components/grouping-form/grouping-form.component';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { TableModule } from 'primeng/table';
import { ScrollTableComponent } from './components/scroll-table/scroll-table.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    FormOneComponent,
    GroupingFormComponent,
    DynamicFormComponent,
    ScrollTableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    TableModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
