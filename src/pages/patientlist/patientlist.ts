import { Component } from '@angular/core';
import { ToastController, ModalController, Loading, LoadingController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserService } from '../../providers/user/user';
import { AppointmentPage } from '../../pages/appointment/appointment';

import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-patientlist',
  templateUrl: 'patientlist.html',
})
export class PatientlistPage {

	patientList: Array<object>;
	loading: Loading;
	moment: any;

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		public userService: UserService,
		public loadingCtrl: LoadingController,
		public modalCtrl: ModalController,
		public toastCtrl: ToastController
	) {
		this.loading = this.showLoading();
		this.patientList = new Array<object>();
		this.moment = moment;
	}

	ionViewDidLoad() {
		this.loadAllPatients();
	}

	loadAllPatients() {
		this.userService.getUserByNutriUid(this.navParams.get('key')).then(
			(doc) => {
				doc.forEach((user) => {
					this.patientList.push(Object.assign(user.doc.data(), {key: user.doc.id}));
				});
			}
		).then(final => {
			this.loading.dismiss();
		});
	}

	getAppointment(appointmentDate, appointmentTime) {
		if (!appointmentDate) {
			return null;
		}
		
		return this.moment(appointmentDate).format("DD/MM/YYYY") + " ás " + appointmentTime; 
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

	showLoading(): Loading {
  		let loading: Loading = this.loadingCtrl.create({
  			content: 'Por favor, aguarde...'
  		});

  		loading.present();
  		return loading;
  	}

  	showAppointmentModal(patientData) {
  		let params = Object.assign({key: this.navParams.get('key')}, patientData),
  			modal = this.modalCtrl.create(AppointmentPage, params);

  		modal.present();
  	}

	showToast(message) {
		let toast = this.toastCtrl.create({
			message: message,
			duration: 2000,
			position: 'top'
		});

		toast.present();
	}
}
