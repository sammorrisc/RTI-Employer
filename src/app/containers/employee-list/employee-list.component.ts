import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeListComponent implements OnInit {
  constructor(
    private router:Router,
  ){}
  ngOnInit(): void {
      
  }
  addEmployee() {
    this.router.navigate(['employee-form'])
  }
}
