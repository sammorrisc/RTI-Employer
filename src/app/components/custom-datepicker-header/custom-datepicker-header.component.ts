import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, ViewContainerRef } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { MatCalendar, MatCalendarHeader, MatDatepickerIntl } from '@angular/material/datepicker';
import { tap } from 'rxjs';
import { DatePickerService } from 'src/app/services/date-picker.service';
import {format} from 'date-fns';
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
  currentViewLabel!:string;

  constructor(
    public _calendar: MatCalendar<Date>,
    private cdr:ChangeDetectorRef,
    private _dateAdapter: DateAdapter<Date>,
    private employeeService:DatePickerService
  ) {
   }

  ngOnInit() {
    this.updateCalendarHeader()
    // this.employeeService.customHeaderInput
    // .asObservable()
    // .pipe(
    //   tap((data)=>{
    //     console.log(data);
    //     if(data.currentDate){
    //       this.currentDate = data.currentDate;
    //     }
    //   })
    // )
    // .subscribe();

    this._calendar.monthSelected.pipe(
      tap(data =>{
        console.log('month selected so changing it to month view..')
        this._calendar.currentView = 'month';
        this.updateCalendarHeader();
      })
    ).subscribe();
    this._calendar.yearSelected
    .pipe(
      tap((res) => {
          console.log('year selected so changed to year view..')
          this._calendar.currentView ='year';
          this.updateCalendarHeader();

        })
      )
      .subscribe();
  }

  buttonSelectHandler(event: Event, type: ButtonTypes){
    event.stopPropagation();
    
    this.selectedType = type;
    if(type === 'previous-month' || type === 'next-month'){
      this._calendar.activeDate = this._dateAdapter.addCalendarMonths(this._calendar.activeDate, type === 'previous-month' ? -1 : 1);
      this.currentDate = this._calendar.activeDate;
      this._calendar.selected = this.currentDate;
    } else if(type === 'today'){
      this._calendar.activeDate = new Date();
      this.currentDate = new Date();
      this._calendar.selected = this.currentDate;
    } else if (type === 'after-one-week') {
      this._calendar.activeDate = this._dateAdapter.addCalendarDays(new Date(),7);
      this.currentDate = this._calendar.activeDate;
      this._calendar.selected = this.currentDate;
    } else if (type === 'next-monday'){
      const today = new Date();
      const dayOfWeek = today.getDay(); // Get the current day (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
      const daysUntilNextMonday = (8 - dayOfWeek) % 7 || 7; // Calculate how many days until next Monday (1 = Monday)
      const nextMondayDate = new Date(today); // Copy the current date to avoid mutating it
      nextMondayDate.setDate(today.getDate() + daysUntilNextMonday); // Add the number of days to get to next Monday
      this._calendar.activeDate = nextMondayDate;
      this.currentDate = nextMondayDate;
      this._calendar.selected = this.currentDate;
    } else if (type === 'next-tuesday') {
      const today = new Date();
      const dayOfWeek = today.getDay(); // Get the current day (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
      const daysUntilNextTuesday = (9 - dayOfWeek) % 7 || 7; // Calculate how many days until next Monday (1 = Monday)
      const nextTuesdayDate = new Date(today); // Copy the current date to avoid mutating it
      nextTuesdayDate.setDate(today.getDate() + daysUntilNextTuesday); // Add the number of days to get to next Monday
      this._calendar.activeDate = nextTuesdayDate;
      this.currentDate = nextTuesdayDate;
      this._calendar.selected = this.currentDate;
    } else if (type === 'multi-year-view'){
      // this._calendar
      this._calendar._goToDateInView(new Date(),'multi-year');
      console.log(this._calendar.selected);
      // this._calendar.year
      this._calendar.selectedChange.pipe(
        tap((res)=>{
          console.log(res);
          this._calendar.selected = res;
          this.currentDate = res;
        })
      ).subscribe()
      // this.currentDate = this._calendar.selected;
      // this._calendar.a
    }
    this.cdr.detectChanges();
    // this.employeeService.headerButtonSubject.next(type);
  }

  viewChangeHandler(event?:Event){
    event?.stopPropagation();
    console.log('view before changing',this._calendar.currentView);
    this._calendar.currentView =
      this._calendar.currentView == "month"
        ? "year"
        : this._calendar.currentView == "year"
          ? "multi-year"
          : "month";
    this.updateCalendarHeader();
    console.log('view after changing', this._calendar.currentView);
    
  }

  updateCalendarHeader() {
    const activeDate = this._calendar.activeDate;

    if (this._calendar.currentView === 'month') {
      // Show full month and year, e.g., October 2024
      this.currentViewLabel = `${format(activeDate, 'MMMM') } ${this._dateAdapter.getYear(activeDate)}`;
      
    } else if (this._calendar.currentView === 'year') {
      // Show only the year, e.g., 2024
      this.currentViewLabel = `${this._dateAdapter.getYear(activeDate)}`;
    } else if (this._calendar.currentView === 'multi-year') {
      // Show range of years, e.g., 2010 - 2040
      const startYear = this.getStartYearForMultiYearView(activeDate);
      const endYear = this.getEndYearForMultiYearView(activeDate);
      this.currentViewLabel = `${startYear} - ${endYear}`;
    }
    console.log('calendar header is below...');
    console.log(this.currentViewLabel);
  }

  getStartYearForMultiYearView(date: Date): number {
    const year = this._dateAdapter.getYear(date);
    return Math.floor(year / 20) * 20; // Adjust this as per the range
  }

  getEndYearForMultiYearView(date: Date): number {
    const startYear = this.getStartYearForMultiYearView(date);
    return startYear + 19; // 20 years range
  }

  previous() {
    if (this._calendar.currentView === 'month') {
      this._calendar.activeDate = this._dateAdapter.addCalendarMonths(this._calendar.activeDate, -1);
    } else if (this._calendar.currentView === 'year') {
      this._calendar.activeDate = this._dateAdapter.addCalendarYears(this._calendar.activeDate, -1);
    } else if (this._calendar.currentView === 'multi-year') {
      this._calendar.activeDate = this._dateAdapter.addCalendarYears(this._calendar.activeDate, -20); // 20-year range
    }
    this.updateCalendarHeader();
  }

  // Handles the 'Next' button click
  next() {
    if (this._calendar.currentView === 'month') {
      this._calendar.activeDate = this._dateAdapter.addCalendarMonths(this._calendar.activeDate, 1);
    } else if (this._calendar.currentView === 'year') {
      this._calendar.activeDate = this._dateAdapter.addCalendarYears(this._calendar.activeDate, 1);
    } else if (this._calendar.currentView === 'multi-year') {
      this._calendar.activeDate = this._dateAdapter.addCalendarYears(this._calendar.activeDate, 20); // 20-year range
    }
    this.updateCalendarHeader();
  }

}
