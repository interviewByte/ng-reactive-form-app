import { state } from '@angular/animations';
import { Component } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.css',
})
export class DynamicFormComponent {
  profileForm = this.formBuilder.group({
    firstName: [''],
    lastName: [''],
    address: this.formBuilder.group({
      street: [''],
      state: [''],
      city: [''],
      zip: [''],
    }),
    aliases: this.formBuilder.array([this.formBuilder.control('')]),
  });
  constructor(public formBuilder: FormBuilder) {}
  get aliases() {
    return this.profileForm.get('aliases') as FormArray;
  }
  addAlias() {
    this.aliases.push(this.formBuilder.control(''));
  }
  removeAlias() {
    if (this.aliases.length > 1) {
      this.aliases.removeAt(this.aliases.length - 1);
    }
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.profileForm.value);
  }
}
