import { state } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ApiCallService } from '../../services/api-call.service';

@Component({
  selector: 'app-grouping-form',
  templateUrl: './grouping-form.component.html',
  styleUrl: './grouping-form.component.css',
})
export class GroupingFormComponent implements OnInit {
  profileForm!: FormGroup;
  addDynamicControl: string = 'Add Your Qualificication';

  constructor(
    public formBuilder: FormBuilder,
    private profileService: ApiCallService
  ) {
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
      hobbies: this.formBuilder.array([
        this.formBuilder.group({
          name: [''],
          level: [''],
          since: [''],
        }),
      ]),
    });
  }
  ngOnInit(): void {
    this.loadProfile();
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
  addHobby() {
    this.hobbies.push(
      this.formBuilder.group({
        name: [''],
        level: [''],
        since: [''],
      })
    );
  }
  removeHobby(index: number) {
    this.hobbies.removeAt(index);
  }

  onSubmit() {
    // this.profileForm.getRawValue() includes everything So when you later submit:

    this.profileForm.getRawValue();
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
  loadProfile() {
    this.profileService.getProfile().subscribe((data) => {
      console.log('API data:', data);

      // 1. Patch normal FormGroup values
      this.profileForm.patchValue({
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        parentDtls: data.parentDtls,
      });

      // 2. Clear and Refill FormArray
      this.hobbies.clear();
      data.hobbies.forEach((hobby: any) => {
        this.hobbies.push(
          this.formBuilder.group({
            name: [hobby.name],
            level: [hobby.level],
            since: [hobby.since],
          })
        );
      });

      // 3. DISABLE NOW (Inside the subscribe block)
      // This disables the entire form including the newly created FormArray controls
      this.profileForm.disable();

      // If you only want to disable the FormArray specifically:
      // this.hobbies.disable();
    });
  }
  test() {
    this.hobbies.controls.forEach((c) => c.disable());
  }
}
