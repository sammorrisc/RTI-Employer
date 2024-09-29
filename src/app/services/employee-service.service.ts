import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {
  headerButtonSubject = new Subject<any>();
  customHeaderInput = new Subject<any>();
  constructor() { }
}
