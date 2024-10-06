import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import {  filter, Observable, of, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { CustomDatepickerHeaderComponent } from 'src/app/components';
import { CustomDatepickerHeaderRangeComponent } from 'src/app/custom-datepicker-header-range/custom-datepicker-header-range.component';
import {DatePickerService,EmployeeService} from 'src/app/services';
import * as moment from 'moment';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeFormComponent implements OnInit,OnDestroy{
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
  customHeaderForStart = CustomDatepickerHeaderComponent;
  employeeFG: FormGroup = new FormGroup({
    name: new FormControl<string>('',{nonNullable:true,validators:[Validators.required]}),
    role: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    joinedAt: new FormControl<Date | null>(null,{validators:[Validators.required]}),
    leftAt: new FormControl<Date | null>(null),
  });
  isActionSheetOpen:boolean = false;
  startViewOfStartDate:'month'|'year'|'multi-year'='month';
  startAt:Date = new Date();
  destroy$ = new Subject<boolean>();
  employeeId = signal<null | string>(null);
  constructor(
    private employeeService:EmployeeService,
    private router:Router,
    private activatedRoute:ActivatedRoute,
  ){}
  ngOnInit(): void {
    this.queryParamsHandling();
  }

  ngOnDestroy(): void {
      this.destroy$.next(true);
      this.destroy$.complete();
  }

  private queryParamsHandling(){
    this.activatedRoute.queryParams.pipe(
      filter(params => !!params['id']),
      switchMap(params => {
        return this.employeeService.waitForDatabase()
          .pipe(
            switchMap(isOpen => isOpen ? this.employeeService.getEmployeeById(params['id']) : of(null))
          )
        }
      ),
      tap((res)=>{
        const data = {
          ...res,
          joinedAt: res.joinedAt ? new Date(+res.joinedAt) : null,
          leftAt: res.leftAt ? new Date(+res.leftAt) : null,
        };
        this.employeeId.set(res.id);
        this.employeeFG.patchValue(data,{emitEvent:false})
      }),
      takeUntil(this.destroy$)
    )
    .subscribe()
    ;
  }

  checkDBOpenStatus():Observable<boolean>{
    return this.employeeService.waitForDatabase()
    .pipe(
      filter((val)=>!!val)
    );
  }
  openActionSheet(){
    this.isActionSheetOpen = !this.isActionSheetOpen;
  }

  openDatePicker(datePicker:MatDatepicker<any>){
    datePicker.open();
  }

  actionSheetDismissHandler(event:any){
    this.isActionSheetOpen = false;
    this.employeeFG.get('role')?.patchValue(event.detail?.data?.action ?? '')
  }

  saveDateHandler(event:Event){
    event.stopPropagation();
    const data = {
      ...this.employeeFG.value,
      joinedAt: this.employeeFG.get('joinedAt')?.value ? moment(this.employeeFG.get('joinedAt')?.value).toDate() : null,
      leftAt: this.employeeFG.get('leftAt')?.value ? moment(this.employeeFG.get('leftAt')?.value).toDate() : null
    };
    this.employeeService.addEmployee(data)
    .pipe(
      tap((res) =>{
        this.employeeFG.reset();
      }),
      takeUntil(this.destroy$)
    )
    .subscribe(); 
  }

  cancelHandler(event:Event){
    event.stopPropagation();
    this.router.navigate(['./employee-list'])
  }
}
