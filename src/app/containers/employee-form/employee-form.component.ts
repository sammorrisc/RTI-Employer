import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { delay, tap } from 'rxjs';
import { CustomDatepickerHeaderComponent } from 'src/app/components';
import { CustomDatepickerHeaderRangeComponent } from 'src/app/custom-datepicker-header-range/custom-datepicker-header-range.component';
import { EmployeeServiceService } from 'src/app/services/employee-service.service';
import { subMonths } from 'date-fns';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeFormComponent implements OnInit,AfterViewInit{
  public employeeRoles = [
    {
      text: 'Product Designer',
      data: {
        action: 'Product Designer',
      },
    },
    {
      text: 'Flutter Developer',
      data: {
        action: 'Flutter Developer',
      },
    },
    {
      text: 'QA Tester',
      data: {
        action: 'QA Tester',
      },
    },
    {
      text: 'Product Owner',
      data: {
        action: 'Product Owner',
      },
    },
  ];
  @ViewChild('startDatePicker',{read:MatDatepicker}) startDatePicker!:MatDatepicker<any>;
  @ViewChild('endDatePicker') endDatePicker!:MatDatepicker<any>;
  customHeaderForStart = CustomDatepickerHeaderComponent;
  customHeaderForEnd = CustomDatepickerHeaderRangeComponent;
  employeeFG: FormGroup = new FormGroup({
    name: new FormControl<string>('',{nonNullable:true}),
    role: new FormControl<string>('',{nonNullable:true}),
    joinedAt: new FormControl<Date>(new Date()),
    savedJoinedAt: new FormControl<Date>(new Date()),
    leftAt: new FormControl<Date | null>(null),
  });
  isActionSheetOpen:boolean = false;
  startViewOfStartDate:'month'|'year'|'multi-year'='month';
  startAt:Date = new Date();

  constructor(
    private emmployeeService:EmployeeServiceService,
    private cdr:ChangeDetectorRef,
    private dateAdapter: DateAdapter<Date>
  ){}
  ngOnInit(): void {
    this.headerInputController();
    this.headerOutputController();

    
  }

  private headerOutputController() {
    this.emmployeeService.headerButtonSubject.asObservable()
      .pipe(
        tap((data) => {
          console.log(data);
          if (data === 'multi-year-view') {
            console.log('closing startDatePicker...');
            this.startViewOfStartDate = 'multi-year';
            this.startDatePicker.close();
            this.cdr.detectChanges();
          }
          if (data === 'previous-month'){
            const todayPreviousMonth = subMonths(new Date(),1);
            console.log(todayPreviousMonth);
            this.startAt = todayPreviousMonth;
            this.emmployeeService.customHeaderInput.next({currentDate:todayPreviousMonth});
            // this.startDatePicker.close();
          }

        }),
        delay(300),
        tap((data) => {
          if (data === 'multi-year-view'){
            console.log('open multi-year-view');
            this.openDatePicker(this.startDatePicker);
          }
          if (data === 'previous-month') {
            // this.openDatePicker(this.startDatePicker);
            
            // const todayPreviousMonth = subMonths(new Date(), 1);
            // console.log(todayPreviousMonth);
            // this.startAt = todayPreviousMonth
          }
        })
      )
      .subscribe();
  }

  private headerInputController(){
    this.employeeFG.get('joinedAt')?.valueChanges
    .pipe(
      tap((joinedAtDate)=>{
        const data = {
          currentDate: joinedAtDate
        }
        this.emmployeeService.customHeaderInput.next(data);
      })
    )
    .subscribe();
  }

  ngAfterViewInit(): void {}
  goToPreviousMonth(): void {
    // Get the current active date
    const currentActiveDate = this.startDatePicker.datepickerInput.getStartValue() || new Date();

    // Subtract one month from the active date
    const previousMonth = this.dateAdapter.addCalendarMonths(currentActiveDate, -1);

    // Set the new active date
    // this.startDatePicker.act = previousMonth;

    // Open the startDatePicker (optional if you want to view it)
    this.startDatePicker.open();
  }
  selectNextTuesday(): void {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday
    const daysUntilNextTuesday = (9 - dayOfWeek) % 7 || 7; // Days until next Tuesday

    const nextTuesday = new Date(today);
    nextTuesday.setDate(today.getDate() + daysUntilNextTuesday);

    // this.selectedDate = nextTuesday;
  }

  openActionSheet(){
    this.isActionSheetOpen = !this.isActionSheetOpen;
  }

  openDatePicker(datePicker:MatDatepicker<any>){
    datePicker.open();
    console.log('opening...')
    this.cdr.detectChanges();
  }

  headerButtonSelect(data:any){
    console.log(data);
  }

  actionSheetDismissHandler(event:any){
    this.isActionSheetOpen = false;
    this.employeeFG.get('role')?.patchValue(event.detail?.data?.action ?? '')
  }

  saveDateHandler(event:Event){
    event.stopPropagation();
    console.log(this.employeeFG.value);
  }
}
