import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PatientlistPage } from './patientlist';

@NgModule({
  declarations: [
    PatientlistPage,
  ],
  imports: [
    IonicPageModule.forChild(PatientlistPage),
  ],
})
export class PatientlistPageModule {}
