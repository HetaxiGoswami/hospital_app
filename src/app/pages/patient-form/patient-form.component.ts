import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PatientService } from '../../core/services/patient.service';
import { Router } from '@angular/router';
import { ApiResponseMOdel, Patient } from '../../core/classes/Hospital.model';

@Component({
  selector: 'app-patient-form',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './patient-form.component.html',
  styleUrl: './patient-form.component.scss',
})
export class PatientFormComponent {
  newPatients: Patient = new Patient();
  isLoading: boolean = false;
  interRegex = /^\d+$/
  emailRegex = /^[a-zA-Z0-9. _%+-]+@[a-zA-Z0-9. -]+\\. [a-zA-Z]{2,}$/
  
  constructor(
    private patientService: PatientService,
    private router: Router,
    public fb: FormBuilder
  ) {
    const storeData = localStorage?.getItem('loginData');
    if (storeData != null) {
      this.newPatients.hospitalId = JSON.parse(storeData).hospitalId;
    }
  }

  addNewPatient() {
    this.isLoading = true;
    this.patientService
      .addnewPatient(this.newPatients)
      .subscribe((res: ApiResponseMOdel) => {
        if (res.result) {
          alert('appointment success');
          this.router.navigateByUrl('patient-list');
        } else {
          alert('Failed ' + res.message);
        }
      });
    this.isLoading = false;
  
  }
}
