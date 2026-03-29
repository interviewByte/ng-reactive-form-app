import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-builder-service',
  templateUrl: './form-builder-service.component.html',
  styleUrl: './form-builder-service.component.css',
})
export class FormBuilderServiceComponent {
  // Using the FormBuilder service to generate controls
  //Use the following steps to take advantage of this service.
  profileForm!: FormGroup;
  // Step1 : Import the FormBuilder class.
  // step2 : Inject the FormBuilder service (create instance of servie).
  // step3 : Generate the form contents.
  constructor(private formBuilder: FormBuilder) {
    this.profileForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      address: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        zip: [''],
      }),
    });
  }
  handlesubmit() {
    console.log(this.profileForm.value);
  }
}
