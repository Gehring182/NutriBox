import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserService } from '../../providers/user/user';

@IonicPage()
@Component({
  selector: 'page-patientlist',
  templateUrl: 'patientlist.html',
})
export class PatientlistPage {

	patientList: Array<object>;

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		public userService: UserService
	) {
		this.patientList = new Array<object>();
	}

	ionViewDidLoad() {
		this.loadAllPatients();
	}

	loadAllPatients() {
		this.userService.getUserByNutriUid(this.navParams.get('key')).then(
			(doc) => {
				doc.forEach((user) => {
					this.patientList.push(user.doc.data());
				})
			}
		);
	}

	getAge(patientDate) {
		if (!patientDate) {
			return null;
		}

		let current = new Date,
			patient = new Date(patientDate),
			currentYear = current.getFullYear(),
			currentMonth = current.getMonth(),
			currentDay = current.getDate(),
			patientYear = patient.getFullYear(),
			patientMonth = patient.getMonth(),
			patientDay = patient.getDate(),
			age;
		
		age = currentYear - patientYear;

		if ((currentMonth < patientMonth) || (currentMonth == patientMonth && currentDay < patientDay)) {
			age--;
		}

		if (age == 0) {
			age = currentMonth - patientMonth;
			return age + " meses";			
		}

		return age + " anos"; 
	}

}
