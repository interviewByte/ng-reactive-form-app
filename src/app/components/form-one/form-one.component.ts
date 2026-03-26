import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-one',
  templateUrl: './form-one.component.html',
  styleUrl: './form-one.component.css',
})
export class FormOneComponent implements OnInit {
  myform!: FormGroup;
  courses: any[] = [
    {
      id: 1,
      lebel: 'C',
    },
    {
      id: 1,
      lebel: 'C++',
    },
    {
      id: 1,
      lebel: 'Java',
    },
    {
      id: 1,
      lebel: 'Python',
    },
    {
      id: 1,
      lebel: 'JavaScript',
    },
  ];
  constructor() {
    this.myform = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      mobilePhone: new FormControl('', [
        Validators.maxLength(10),
        Validators.required,
      ]),
      course: new FormControl('', Validators.required),
      experience: new FormControl(0, Validators.required),
    });
  }
  ngOnInit(): void {
    console.log('this.form', this.myform);
    this.myform.controls['experience'].disable();
    this.myform.get('course')?.valueChanges.subscribe((val: any) => {
      this.myform.controls['experience'].enable();
      console.log('this.form', this.myform);
      this.myform.addControl('salary', new FormControl(''));
    });
  }
  handSubmit() {
    console.log('This.fomr', this.myform.value);
  }
  handleClick() {
    if (this.myform.contains('salary')) {
      this.myform.removeControl('salary');
    }
  }
  addNewFormGroup() {
    this.myform.addControl(
      'address',
      new FormGroup({
        country: new FormControl(''),
        state: new FormControl(''),
        city: new FormControl(''),
        zipcode: new FormControl(''),
      }),
    );
  }
}
