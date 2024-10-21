import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Constant } from '../constant/Constant';
import {
  ApiResponseMOdel,
  Appointment,
  Hospital,
  Patient,
  User,
} from '../classes/Hospital.model';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  constructor(private http: HttpClient) {}

  getPatientbyHospital(id: number): Observable<ApiResponseMOdel> {
    return this.http.get<ApiResponseMOdel>(
      environment.api_url + Constant.API_END_POINT.GET_PATIENTBY_HOSPITAL + id
    );
  }

  getPatients(): Observable<ApiResponseMOdel> {
    return this.http.get<ApiResponseMOdel>(
      environment.api_url + Constant.API_END_POINT.GET_PATIENTS
    );
  }

  addnewPatient(obj: Patient): Observable<ApiResponseMOdel> {
    return this.http.post<ApiResponseMOdel>(
      environment.api_url + Constant.API_END_POINT.ADD_NEW_PATIENT,
      obj
    );
  }

  getHospitalName(): Observable<ApiResponseMOdel> {
    return this.http.get<ApiResponseMOdel>(
      environment.api_url + Constant.API_END_POINT.GET_HOSPITAL_NAME
    );
  }
}
