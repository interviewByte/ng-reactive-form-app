import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

// import {DynamicFormQuestionComponent} from './dynamic-form-question.component';

import { QuestionBase } from '../../question-base';
import { QuestionControlService } from '../../question-control.service';
@Component({
  selector: 'app-building-dynamic-form',
  templateUrl: './building-dynamic-form.component.html',
  styleUrl: './building-dynamic-form.component.css',
})
export class BuildingDynamicFormComponent {
  @Input() questions: QuestionBase<string>[] | null = [];
  form!: FormGroup;
  payLoad = '';

  constructor(private qcs: QuestionControlService) {}

  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.questions as QuestionBase<string>[]);
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.getRawValue());
    console.log('this.form.value', this.form.value);
    console.log('this.form.getRawValue()', this.form.getRawValue());
  }
}
