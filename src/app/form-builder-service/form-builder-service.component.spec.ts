import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBuilderServiceComponent } from './form-builder-service.component';

describe('FormBuilderServiceComponent', () => {
  let component: FormBuilderServiceComponent;
  let fixture: ComponentFixture<FormBuilderServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormBuilderServiceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormBuilderServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
