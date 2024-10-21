import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Constant } from '../constant/Constant';
import { ApiResponseMOdel, Hospital, User } from '../classes/Hospital.model';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(private http: HttpClient) { }

  registerHospital(obj:Hospital): Observable<ApiResponseMOdel>{
  return this.http.post<ApiResponseMOdel>(environment.api_url + Constant.API_END_POINT.ADD_NEW_HOSPITAL,obj)
  }

  loginHostital(obj:User):Observable<ApiResponseMOdel>{
    return this.http.post<ApiResponseMOdel>(environment.api_url + Constant.API_END_POINT.LOGIN ,obj )
  }


}
