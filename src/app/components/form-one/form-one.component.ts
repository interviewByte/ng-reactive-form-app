import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-one',
  templateUrl: './form-one.component.html',
  styleUrl: './form-one.component.css',
})
export class FormOneComponent implements OnInit, AfterViewInit {
  myform!: FormGroup;
  allStates: any[] = [];
  countries = [
    { id: 1, countryName: 'India' },
    { id: 2, countryName: 'United States' },
    { id: 3, countryName: 'Canada' },
    { id: 4, countryName: 'Australia' },
    { id: 5, countryName: 'Germany' },
  ];
  states = [
    {
      id: 1,
      countryName: 'India',
      stateName: [
        { id: 1, name: 'Uttar Pradesh' },
        { id: 2, name: 'Maharashtra' },
        { id: 3, name: 'Karnataka' },
      ],
    },
    {
      id: 2,
      countryName: 'United States',
      stateName: [
        { id: 1, name: 'California' },
        { id: 2, name: 'Texas' },
        { id: 3, name: 'New York' },
      ],
    },
    {
      id: 3,
      countryName: 'Canada',
      stateName: [
        { id: 1, name: 'Ontario' },
        { id: 2, name: 'Quebec' },
        { id: 3, name: 'British Columbia' },
      ],
    },
    {
      id: 4,
      countryName: 'Australia',
      stateName: [
        { id: 1, name: 'New South Wales' },
        { id: 2, name: 'Victoria' },
        { id: 3, name: 'Queensland' },
      ],
    },
    {
      id: 5,
      countryName: 'Germany',
      stateName: [
        { id: 1, name: 'Bavaria' },
        { id: 2, name: 'Berlin' },
        { id: 3, name: 'Hamburg' },
      ],
    },
  ];
  constructor() {
    this.myform = new FormGroup({
      // Basic Info
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      mobilePhone: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[0-9]{10}$/),
      ]),
      // birht detail
      country: new FormControl(''),
      state: new FormControl(''),

      // Professional
      role: new FormControl('', Validators.required),
      experience: new FormControl(0, Validators.required),
      currentCompany: new FormControl(''),
      location: new FormControl(''),

      // Skills (dynamic)
      skills: new FormArray([
        new FormControl('', Validators.required),
        new FormControl('', Validators.required),
      ]),

      // Projects (dynamic)
      projects: new FormArray([
        new FormGroup({
          title: new FormControl('', Validators.required),
          description: new FormControl(''),
          techStack: new FormControl(''),
        }),
      ]),

      // Education
      education: new FormControl('', Validators.required),
      course: new FormControl('', Validators.required),

      // Links
      github: new FormControl(''),
      linkedin: new FormControl(''),
      portfolio: new FormControl(''),

      // Extra
      about: new FormControl(''),
    });
  }
  ngOnInit(): void {
    this.myform.get('course')?.valueChanges.subscribe((val: any) => {
      this.myform.controls['experience'].enable();
      console.log('this.form', this.myform);
      this.myform.addControl('salary', new FormControl(''));
    });
    this.myform.get('country')?.valueChanges.subscribe((response: any) => {
      if (response === '') {
        this.myform.get('state')?.setValue('');
        this.allStates = [];
        return;
      }
      for (let i = 0; i < this.states.length; i++) {
        if (Number(this.states[i].id) === Number(response)) {
          this.allStates = this.states[i].stateName;
          break;
        }
      }
    });
  }
  ngAfterViewInit(): void {}
  handSubmit() {
    console.log('This.fomr', this.myform.value);
    this.myform.reset();
  }

  get skills(): FormArray {
    return this.myform.get('skills') as FormArray;
  }
  get projects(): FormArray {
    return this.myform.get('projects') as FormArray;
  }
  addSkill() {
    this.skills.push(new FormControl(''));
  }
  removeSkill(index: number) {
    this.skills.removeAt(index);
  }
  addProject() {
    this.projects.push(
      new FormGroup({
        title: new FormControl('', Validators.required),
        description: new FormControl(''),
        techStack: new FormControl(''),
      }),
    );
  }
  removeProject(index: any) {
    this.projects.removeAt(index);
  }
  singleFiled() {
    this.myform.addControl('anything', new FormControl(''));
  }
  addFormGroup() {
    this.myform.addControl(
      'anythingGroup',
      new FormGroup({
        gender: new FormControl(''),
        birthCountry: new FormControl(''),
      }),
    );
  }
  addFormArray() {
    this.myform.addControl('family', new FormArray([]));
  }
  get family() {
    return this.myform.get('family') as FormArray;
  }
  addFamily() {
    this.family.push(new FormControl(''));
  }
  removeMember(index: number) {
    this.family.removeAt(index);
  }
}
