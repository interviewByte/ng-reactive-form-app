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
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LoginComponent } from './components/login/login.component';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    FormOneComponent,
    GroupingFormComponent,
    DynamicFormComponent,
    ScrollTableComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    TableModule,
    HttpClientModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    CommonModule,
  ],
  providers: [provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
