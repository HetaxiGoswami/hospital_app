import { Component, OnDestroy } from '@angular/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { ApiResponseMOdel, Hospital } from '../../core/classes/Hospital.model';
import { FormsModule } from '@angular/forms';
import { HospitalService } from '../../core/services/hospital.service';
import { error } from 'console';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-hospital',
  standalone: true,
  imports: [
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    FormsModule,
  ],
  templateUrl: './new-hospital.component.html',
  styleUrl: './new-hospital.component.scss',
})
export class NewHospitalComponent {

  private subscription : Subscription [] =[]
  public hospitalObj: Hospital = new Hospital();

  constructor(private hospitalService: HospitalService) {}

  onRegister() {
   this.subscription.push(
    this.hospitalService.registerHospital(this.hospitalObj).subscribe(
      (res: ApiResponseMOdel) => {
        if (res.result) {
          alert('registraion success');
        } else {
          alert(res.message);
        }
      },
      (error) => {
        alert(JSON.stringify(error));
      }
    )
   )
  }
}

