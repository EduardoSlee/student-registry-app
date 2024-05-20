import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { StudentListComponent } from '../app/components/student-list/student-list.component';
import { StudentDetailComponent } from '../app/components/student-detail/student-detail.component';

import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { ImageModule } from 'primeng/image';
import { ButtonModule } from 'primeng/button';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';

import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';


@NgModule({
  declarations: [AppComponent, StudentListComponent, StudentDetailComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    InputTextModule,
    CalendarModule,
    DropdownModule,
    FileUploadModule,
    ImageModule,
    ButtonModule,
    ToastModule,
    RouterModule,
    AppRoutingModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}

