import { state } from '@angular/animations';
import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-grouping-form',
  templateUrl: './grouping-form.component.html',
  styleUrl: './grouping-form.component.css',
})
export class GroupingFormComponent {
  profileForm!: FormGroup;
  addDynamicControl: string = 'Add Your Qualificication';

  constructor(public formBuilder: FormBuilder) {
    this.profileForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: [''],
      address: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        zip: [''],
      }),
      parentDtls: this.formBuilder.group({
        fatherName: [''],
        motherName: [''],
        fatherMobile: [''],
        motherMobile: [''],
      }),
      hobbies: this.formBuilder.array([this.formBuilder.control('')]),
    });
  }
  // *************Access the FormArray control *************
  get hobbies() {
    return this.profileForm.get('hobbies') as FormArray;
  }
  //  Define a method to dynamically insert a hobby control into the hobbies form array. The FormArray.push()
  addAlias() {
    this.hobbies.push(this.formBuilder.control(''));
  }
  removeAlias(index: number) {
    this.hobbies.removeAt(index);
  }

  onSubmit() {
    console.log('this.profileForm', this.profileForm.value);
  }
  updateProfile() {
    this.profileForm.patchValue({
      firstName: 'Nancy',
      address: {
        street: '123 Drew Street',
      },
    });
  }
  addQualification() {
    // **************** Create the FormGroup instance ************
    // const qualificationGroup = new FormGroup({
    //   degree: new FormControl(''),
    //   university: new FormControl(''),
    //   year: new FormControl(''),
    // });

    // **************** Using FormBuilder (Preferred at Your Level) ********
    // const qualificationGroup = this.formBuilder.group({
    //   degree: [''],
    //   university: [''],
    //   year: [''],
    // }) as FormGroup;

    // const qualificationGroup = this.formBuilder.group({}) as FormGroup;
    // qualificationGroup.addControl('degree', new FormControl(''));
    // qualificationGroup.addControl('university', new FormControl(''));
    // qualificationGroup.addControl('year', new FormControl(''));
    // qualificationGroup.addControl(
    //   'degree',
    //   this.formBuilder.control('', Validators.required)
    // );
    // qualificationGroup.addControl(
    //   'university',
    //   this.formBuilder.control('', Validators.required)
    // );
    // qualificationGroup.addControl(
    //   'year',
    //   this.formBuilder.control('', Validators.required)
    // );
    const qualificationConfig = {
      degree: ['', Validators.required],
      university: ['', Validators.required],
      year: ['', Validators.required],
    };

    const qualificationGroup = this.formBuilder.group(qualificationConfig);

    // ***********Add in final form***********
    this.profileForm.addControl('qualification', qualificationGroup);
    this.addDynamicControl = 'Remove Qualification';
  }
  // REMOVE qualification FormGroup
  removeQualification(): void {
    if (this.profileForm.contains('qualification')) {
      this.profileForm.removeControl('qualification');
      this.addDynamicControl = 'Add Your Qualification';
    }
  }
  toggleQualification() {
    console.log('inse');
    this.profileForm.contains('qualification')
      ? this.removeQualification()
      : this.addQualification();
  }
}
