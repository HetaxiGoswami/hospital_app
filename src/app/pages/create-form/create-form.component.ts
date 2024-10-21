import { Component } from '@angular/core';
import { AppointmentService } from '../../core/services/appointment.service';
// import { Router } from 'express';
import {
  ApiResponseMOdel,
  Appointment,
} from '../../core/classes/Hospital.model';
import { Router } from '@angular/router';
import { FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-form',
  standalone: true,
  imports: [FormsModule, CommonModule,ReactiveFormsModule],
  templateUrl: './create-form.component.html',
  styleUrl: './create-form.component.scss',
})
export class CreateFormComponent {
  newAppointment: Appointment = new Appointment();
  appointmentList: Appointment[] = [];
  isLoading: boolean = false;
  interRegex = /^\d+$/
  emailRegex = /^[a-zA-Z0-9. _%+-]+@[a-zA-Z0-9. -]+\\. [a-zA-Z]{2,}$/
  
  constructor(
    private appointService: AppointmentService,
    private router: Router
  ) {
    const storeData = localStorage?.getItem('loginData');
    if (storeData != null) {
      this.newAppointment.hospitalId = JSON.parse(storeData).hospitalId;
    }
  }

  bookAppointment() {
    this.isLoading = true
    this.appointService
      .newAppointment(this.newAppointment)
      .subscribe((res: ApiResponseMOdel) => {
        if (res.result) {
          alert('Appointment booked successfully!');
          this.router.navigateByUrl('appointment');
        } else {
          alert('Failed ' + res.message);
        }
      })
     this.isLoading = false
  }

  getAllAppointments() {
    this.appointService
      .getAppointmentByHospital(this.newAppointment.hospitalId)
      .subscribe((res: ApiResponseMOdel) => {
        this.appointmentList = res.data;
      });
  }
}
