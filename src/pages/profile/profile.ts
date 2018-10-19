import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserService } from '../../providers/user/user';
import { AuthService } from '../../providers/auth/auth';
import { EventService } from '../../providers/event/event';
import { HomePage } from '../home/home';
import { EvaluationPage } from '../evaluation/evaluation';

import * as moment from 'moment';

@IonicPage()
@Component({
	selector: 'page-profile',
	templateUrl: 'profile.html',
})
export class ProfilePage {

	nutriData: any;
	appointment: string;
	moment: any;

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		public userService: UserService,
		public authService: AuthService,
		public eventService: EventService
	) {
		this.nutriData = {};
		this.appointment = null;
		this.moment = moment;
		this.fetchNutriData();
	}

	fetchNutriData() {
		this.userService.getUserByUid(this.navParams.get("nutri")).then((doc) => {
			this.nutriData = doc;
		});
	}

	get AppointmentDate() {
		if (!this.navParams.get("appointmentDate")) {
			return null;
		}

		this.appointment = "Você tem uma consulta agendada para ";

		return this.moment(this.navParams.get("appointmentDate")).format("DD/MM/YYYY") + " ás " 
			+ this.navParams.get("appointmentTime");
	}

	get ProfileHeader() {
		let hr = new Date().getHours();
		if (hr > 18 || hr < 4) {
			return "Boa noite " + this.navParams.get('name');
		}

		if (hr > 12) {
			return "Boa tarde " + this.navParams.get('name');
		}

		return "Bom dia " + this.navParams.get('name'); 
	}

	openEvaluation() {
		this.navCtrl.push(EvaluationPage, {key: this.navParams.get('key'), nutri: this.navParams.get("nutri")});
	}

	logOut() {
		this.userService.update(this.navParams.get('key'), {
			lastSession: new Date
		}).then((bool) => { 
			if (bool) {
				this.authService.signOut();
				this.navCtrl.setRoot(HomePage);	
			}
		});
	}
}
