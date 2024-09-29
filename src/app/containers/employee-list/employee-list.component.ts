import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeListComponent implements OnInit {
  url = "https://cliniceo.blr1.cdn.digitaloceanspaces.com/CliniceoMasterFiles/images/62a2ff26f5845f1bd430d993_1670951296134_profilePic.jpeg";
  constructor(
    private router:Router,
  ){}
  ngOnInit(): void {
      
  }
  addEmployee() {
    this.router.navigate(['employee-form'])
  }
}
