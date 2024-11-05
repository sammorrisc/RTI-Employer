import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule, NativeDateAdapter } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { CdkDropList, CdkDrag } from '@angular/cdk/drag-drop';


import { AppComponent } from './app.component';
import * as appComponents from './components';
import * as appContainers from './containers';
import { AppRoutingModule } from './app.routes';
import * as constantData from 'src/data/data';

@NgModule({
  declarations: [
    AppComponent,
    ...appComponents.components,
    ...appContainers.containers,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule, 
    MatInputModule,
    MatDatepickerModule, 
    MatButtonModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    CdkDropList, 
    CdkDrag,
    IonicModule.forRoot()

  ],
  providers: [NativeDateAdapter, 
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    // { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMAT }
    { provide: MAT_DATE_FORMATS, useValue: constantData.CUSTOM_DATE_FORMATS }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
