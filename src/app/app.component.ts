import { Component, Inject, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import {
  ApiResponseMOdel,
  Hospital,
  User,
} from './core/classes/Hospital.model';
import { FormsModule } from '@angular/forms';
import { HospitalService } from './core/services/hospital.service';
import { CommonModule, DOCUMENT } from '@angular/common';
import { constrainedMemory } from 'process';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'hospital_app';
  userObj: User = new User();
  isLoading: boolean = false;
  loggedHospitalData: Hospital = new Hospital();
  private hospitalService = inject(HospitalService);

  constructor(
    private hosSer: HospitalService,
    @Inject(DOCUMENT) private document: Document,
    private router: Router
  ) {
    const localStorage = document.defaultView?.localStorage;
    const storeData = localStorage?.getItem('loginData');
    console.log(storeData);
    if (storeData) {
      this.loggedHospitalData = JSON.parse(storeData);
    }
  }

  addLogin() {
    this.isLoading = true;
    this.hospitalService
      .loginHostital(this.userObj)
      .subscribe((res: ApiResponseMOdel) => {
        if (res.result) {
          this.loggedHospitalData = res.data;
          localStorage.setItem('loginData', JSON.stringify(res.data));
          this.userObj.userName = '';
          this.userObj.password = '';
          this.closeLogin();
        } else {
          alert(res.message);
        }
        this.isLoading =false
      });
  }

  showLogin() {
    const model = document.getElementById('loginModal');
    if (model != null) {
      model.style.display = 'block';
    }
  }

  closeLogin() {
    const model = document.getElementById('loginModal');
    if (model != null) {
      model.style.display = 'none';
    }
  }

  logOff() {
    localStorage.removeItem('loginData');
    this.loggedHospitalData = new Hospital();
    this.router.navigateByUrl('home');
  }
}
