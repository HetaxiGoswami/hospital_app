import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../core/services/patient.service';
import { Router } from '@angular/router';
import {
  ApiResponseMOdel,
  Hospital,
  Patient,
} from '../../core/classes/Hospital.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './patient-list.component.html',
  styleUrl: './patient-list.component.scss',
})
export class PatientListComponent implements OnInit {
  newPatient: Patient = new Patient();
  patientList: Patient[] = [];
  hospitalName: Hospital = new Hospital();
  hospitalNameList: Hospital[] = [];

  constructor(private patientService: PatientService, private router: Router) {
    const storeData = localStorage?.getItem('loginData');
    if (storeData) {
      this.newPatient = JSON.parse(storeData);
    }
  }

  name(event:any) {
    const name = this.hospitalNameList.filter(
      (item) => item.hospitalName == 'hospitalId'
    );
    console.log(name);
  }

  ngOnInit(): void {
    this.getPatients();
    this.gethospitalName();
  }

  addpatientForm() {
    this.router.navigateByUrl('hospital-form');
  }

  getPatients() {
    this.patientService
      .getPatientbyHospital(this.newPatient.hospitalId)
      .subscribe((res: ApiResponseMOdel) => {
        this.patientList = res.data;
      });
  }

  gethospitalName() {
    this.patientService.getHospitalName().subscribe((res: ApiResponseMOdel) => {
      this.hospitalNameList = res.data;
    });
  }
}
