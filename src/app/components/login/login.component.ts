import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  myform!: FormGroup;
  constructor(public fb: FormBuilder) {}
  ngOnInit(): void {
    this.myform = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
    console.log('this.form', this.myform);
  }
  handleSubmit() {
    console.log('form submitted:', this.myform.value);
  }
}
