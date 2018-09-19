import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-patientlist',
  templateUrl: 'patientlist.html',
})
export class PatientlistPage {

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams
	) {
		console.log(this.navParams.get('key'));
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad PatientlistPage');
	}

}
