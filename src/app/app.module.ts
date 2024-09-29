import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';


import { AppComponent } from './app.component';
import * as appComponents from './components';
import * as appContainers from './containers';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app.routes';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule, NativeDateAdapter } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomDatepickerHeaderRangeComponent } from './custom-datepicker-header-range/custom-datepicker-header-range.component';

@NgModule({
  declarations: [
    AppComponent,
    ...appComponents.components,
    ...appContainers.containers,
    CustomDatepickerHeaderRangeComponent,
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
    // MatDateFnsModule, 
    // MatLuxonDateModule, 
    // MatMomentDateModule,
    IonicModule.forRoot()

  ],
  providers: [NativeDateAdapter],
  bootstrap: [AppComponent]
})
export class AppModule { }
