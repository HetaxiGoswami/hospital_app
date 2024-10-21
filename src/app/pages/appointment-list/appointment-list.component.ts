import { Component, OnInit } from '@angular/core';
import {
  ApiResponseMOdel,
  Appointment,
} from '../../core/classes/Hospital.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppointmentService } from '../../core/services/appointment.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-appointment-list',
  standalone: true,
  imports: [CommonModule, FormsModule, MatTableModule, MatPaginatorModule],
  templateUrl: './appointment-list.component.html',
  styleUrl: './appointment-list.component.scss',
})
export class AppointmentListComponent implements OnInit {
  newAppointment: Appointment = new Appointment();
  appointmentList: Appointment[] = [];
  constructor(
    private appointService: AppointmentService,
    private router: Router
  ) {
    const storeData = localStorage?.getItem('loginData');
    if (storeData != null) {
      this.newAppointment.hospitalId = JSON.parse(storeData).hospitalId;
    }
  }

  ngOnInit(): void {
    this.getAllAppointments();
  }

  bookAppointment() {
    this.appointService
      .newAppointment(this.newAppointment)
      .subscribe((res: ApiResponseMOdel) => {
        if (res.result) {
          alert('appointment success');
          this.getAllAppointments();
        } else {
          alert(res.message);
        }
      });
  }

  getAllAppointments() {
    this.appointService
      .getAppointmentByHospital(this.newAppointment.hospitalId)
      .subscribe((res: ApiResponseMOdel) => {
        this.appointmentList = res.data;
      });
  }

  CreateNewAppointment() {
    this.router.navigateByUrl('create-new-appointment');
  }
}
