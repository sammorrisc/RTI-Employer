import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, ViewContainerRef } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { MatCalendar, MatCalendarHeader, MatDatepickerIntl } from '@angular/material/datepicker';
import { tap } from 'rxjs';
import { EmployeeServiceService } from 'src/app/services/employee-service.service';

type ButtonTypes = 'today' | 'next-monday' | 'next-tuesday' | 'after-one-week'
  | 'previous-month' | 'next-month' | 'multi-year-view' | null;
@Component({
  selector: 'app-custom-datepicker-header',
  templateUrl: './custom-datepicker-header.component.html',
  styleUrls: ['./custom-datepicker-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CustomDatepickerHeaderComponent<D> {
  currentDate:any = new Date();
  selectedType: ButtonTypes = null;
  constructor(
    private _calendar: MatCalendar<Date>,
    private cdr:ChangeDetectorRef,
    private _dateAdapter: DateAdapter<Date>,
    private viewContainer: ViewContainerRef,
    private employeeService:EmployeeServiceService
  ) {
   }

  ngOnInit() {
    this.employeeService.customHeaderInput
    .asObservable()
    .pipe(
      tap((data)=>{
        console.log(data);
        if(data.currentDate){
          this.currentDate = data.currentDate;
        }
      })
    )
    .subscribe();

    this._calendar.monthSelected.pipe(
      tap(data =>{
        console.log('in month seelcted..');
        console.log(data);
      })
    ).subscribe();
  }

  buttonSelectHandler(event: Event, type: ButtonTypes){
    event.stopPropagation();
    console.log(this._calendar);
    this.selectedType = type;
    if(type === 'previous-month' || type === 'next-month'){
      this._calendar.activeDate = this._dateAdapter.addCalendarMonths(this._calendar.activeDate, type === 'previous-month' ? -1 : 1);
      this.currentDate = this._calendar.activeDate;
    } else if(type === 'today'){
      this._calendar.activeDate = new Date();
      this.currentDate = new Date();
    } else if (type === 'after-one-week') {
      this._calendar.activeDate = this._dateAdapter.addCalendarDays(new Date(),7);
      this.currentDate = this._calendar.activeDate;
    } else if (type === 'next-monday'){
      const today = new Date();
      const dayOfWeek = today.getDay(); // Get the current day (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
      const daysUntilNextMonday = (8 - dayOfWeek) % 7 || 7; // Calculate how many days until next Monday (1 = Monday)
      const nextMondayDate = new Date(today); // Copy the current date to avoid mutating it
      nextMondayDate.setDate(today.getDate() + daysUntilNextMonday); // Add the number of days to get to next Monday
      this._calendar.activeDate = nextMondayDate;
      this.currentDate = nextMondayDate;
    } else if (type === 'next-tuesday') {
      const today = new Date();
      const dayOfWeek = today.getDay(); // Get the current day (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
      const daysUntilNextTuesday = (9 - dayOfWeek) % 7 || 7; // Calculate how many days until next Monday (1 = Monday)
      const nextTuesdayDate = new Date(today); // Copy the current date to avoid mutating it
      nextTuesdayDate.setDate(today.getDate() + daysUntilNextTuesday); // Add the number of days to get to next Monday
      this._calendar.activeDate = nextTuesdayDate;
      this.currentDate = nextTuesdayDate;
    }
    this.cdr.detectChanges();
    // this.employeeService.headerButtonSubject.next(type);
  }
}
