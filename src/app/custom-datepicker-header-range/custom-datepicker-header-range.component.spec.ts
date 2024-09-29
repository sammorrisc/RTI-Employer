import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomDatepickerHeaderRangeComponent } from './custom-datepicker-header-range.component';

describe('CustomDatepickerHeaderRangeComponent', () => {
  let component: CustomDatepickerHeaderRangeComponent;
  let fixture: ComponentFixture<CustomDatepickerHeaderRangeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomDatepickerHeaderRangeComponent]
    });
    fixture = TestBed.createComponent(CustomDatepickerHeaderRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
