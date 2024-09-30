import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatePickerService {
  // headerButtonSubject = new Subject<any>();
  customHeaderInput = new Subject<any>();
  constructor() { }
}
