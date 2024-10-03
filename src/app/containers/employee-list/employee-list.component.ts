import { ChangeDetectionStrategy, Component, OnInit, Signal } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services';
import {toSignal} from '@angular/core/rxjs-interop'
import { filter, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeListComponent implements OnInit {
  employees!:Signal<any>;
  constructor(
    private router:Router,
    private employeeService:EmployeeService
  ){
    this.getEmployees();
  }
  ngOnInit(): void {
    
  }
  addEmployee() {
    this.router.navigate(['employee-form'])
  }
  getEmployees(){
    const employees$ = this.employeeService
      .waitForDatabase()
      .pipe(
        filter((isReady) => isReady), // Ensure database is ready
        switchMap(() => this.employeeService.getEmployees()),
        tap(res =>{
          console.log(res)
        }) // Once ready, get employees
      );
    this.employees = toSignal(employees$);
    // console.log(this.employees()); 
  }
  editEmployee(event:Event,id:number){
    event.stopPropagation();
    this.router.navigate(['employee-form'],{queryParams:{
      id
    }})
  }
}
