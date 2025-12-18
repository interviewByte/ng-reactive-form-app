import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingDynamicFormComponent } from './building-dynamic-form.component';

describe('BuildingDynamicFormComponent', () => {
  let component: BuildingDynamicFormComponent;
  let fixture: ComponentFixture<BuildingDynamicFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuildingDynamicFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuildingDynamicFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
