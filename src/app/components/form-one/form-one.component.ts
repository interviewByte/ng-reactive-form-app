import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-one',
  templateUrl: './form-one.component.html',
  styleUrl: './form-one.component.css',
})
export class FormOneComponent {
  name = new FormControl('');
  updateName() {
    this.name.setValue('Nancy');
  }
}
