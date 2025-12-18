import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { QuestionBase } from '../../question-base';
@Component({
  selector: 'app-building-form-question',
  templateUrl: './building-form-question.component.html',
  styleUrl: './building-form-question.component.css',
})
export class BuildingFormQuestionComponent {
  @Input() question!: QuestionBase<string>;
  @Input() form!: FormGroup;
  get isValid() {
    return this.form.controls[this.question.key].valid;
  }
}
