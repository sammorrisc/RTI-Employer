import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, ViewContainerRef } from '@angular/core';
import { DatePickerService } from '../services/date-picker.service';

@Component({
  selector: 'app-custom-datepicker-header-range',
  templateUrl: './custom-datepicker-header-range.component.html',
  styleUrls: ['./custom-datepicker-header-range.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomDatepickerHeaderRangeComponent {
  @Output() buttonSelectedEmitter = new EventEmitter<string>();
  constructor(
    private employeeService: DatePickerService
  ) { }

  ngOnInit() {}


  buttonSelectHandler(event: Event, type: string) {
    event.stopPropagation();
    // this.employeeService.headerButtonSubject.next(type);
  }
}
