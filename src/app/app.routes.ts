import { Routes } from '@angular/router';
import { PatientListComponent } from './pages/patient-list/patient-list.component';
import { NewHospitalComponent } from './pages/new-hospital/new-hospital.component';
import { HospitalListComponent } from './pages/hospital-list/hospital-list.component';
import { AppointmentListComponent } from './pages/appointment-list/appointment-list.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { CreateFormComponent } from './pages/create-form/create-form.component';
import { PatientFormComponent } from './pages/patient-form/patient-form.component';

export const routes: Routes = [

    {
        path:'',
        redirectTo:'home',
        pathMatch:'full'
      },
      {
        path:'home',
        component:HomeComponent
      },
      {
        path:'dashboard',
        component:DashboardComponent
      },
      {
        path:'appointment',
        component:AppointmentListComponent
      },
      {
        path:'hospital-list',
        component:HospitalListComponent
      },
      {
        path:'new-hospital',
        component:NewHospitalComponent
      },
      {
        path:'patient-list',
        component:PatientListComponent
      },
      {
        path:'create-new-appointment',
        component:CreateFormComponent
      },
      {
        path:'patient-list',
        component:PatientListComponent
      },
      {
        path:'hospital-form',
        component:PatientFormComponent
      }
];
