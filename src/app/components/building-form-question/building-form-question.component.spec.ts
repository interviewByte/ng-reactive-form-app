import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingFormQuestionComponent } from './building-form-question.component';

describe('BuildingFormQuestionComponent', () => {
  let component: BuildingFormQuestionComponent;
  let fixture: ComponentFixture<BuildingFormQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuildingFormQuestionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuildingFormQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
