import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupingFormComponent } from './grouping-form.component';

describe('GroupingFormComponent', () => {
  let component: GroupingFormComponent;
  let fixture: ComponentFixture<GroupingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GroupingFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GroupingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
