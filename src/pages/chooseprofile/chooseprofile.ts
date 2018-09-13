import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { SignuppatientPage } from '../signuppatient/signuppatient';

@IonicPage()
@Component({
  selector: 'page-chooseprofile',
  templateUrl: 'chooseprofile.html',
})
export class ChooseprofilePage {

  	constructor(
  		public navCtrl: NavController, 
  		public navParams: NavParams
  	) {
  	}

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad ChooseprofilePage');
  	}

  	onSignup() {
		this.navCtrl.push(SignupPage);
	}

	onSignupPatient() {
		this.navCtrl.push(SignuppatientPage);
	}
}
