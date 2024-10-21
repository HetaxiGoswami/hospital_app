import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Constant } from '../constant/Constant';
import { ApiResponseMOdel, Appointment, Hospital, User } from '../classes/Hospital.model';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private http: HttpClient) {
   }
   newAppointment(obj:Appointment): Observable<ApiResponseMOdel>{
    return this.http.post<ApiResponseMOdel>(environment.api_url + Constant.API_END_POINT.New_APPOINTMENT,obj)
    }

    getAppointmentByHospital(id:number):Observable<ApiResponseMOdel>{
      return this.http.get<ApiResponseMOdel>(environment.api_url + Constant.API_END_POINT.GET_APPOINTMENTS_BY_HOSPITAL + id )
    }
  
    getAppintment():Observable<ApiResponseMOdel>{
      return this.http.get<ApiResponseMOdel>(environment.api_url + Constant.API_END_POINT.GET_APPOINTMENTS)
    }
  
}
