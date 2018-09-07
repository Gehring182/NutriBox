import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserService } from '../../providers/user/user';
import { PatientPage } from '../patient/patient';

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		public userService: UserService
	) {
		console.log(this.navParams.get('uid'));
		console.log(this.navParams.get('crn'));
		console.log(this.navParams.get('birth'));
		//this.userService.getUserByUid(this.navParams.get('uid')).then(data => {console.log(data)});
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad MainPage');
	}

	openPage() {
		this.navCtrl.push(PatientPage);
	}

}
