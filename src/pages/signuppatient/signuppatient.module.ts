import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignuppatientPage } from './signuppatient';

@NgModule({
  declarations: [
    SignuppatientPage,
  ],
  imports: [
    IonicPageModule.forChild(SignuppatientPage),
  ],
})
export class SignuppatientPageModule {}
