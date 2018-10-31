import { Component } from '@angular/core';
import { ToastController, Loading, LoadingController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserService } from '../../providers/user/user';
import { EventService } from '../../providers/event/event';
import { AppointmentPage } from '../../pages/appointment/appointment';
import { EvaluationresultPage } from '../../pages/evaluationresult/evaluationresult';

import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-patientlist',
  templateUrl: 'patientlist.html',
})
export class PatientlistPage {

	patientsList: Array<object>;
	loading: Loading;
	moment: any;

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		public userService: UserService,
		public eventService: EventService,
		public loadingCtrl: LoadingController,
		public toastCtrl: ToastController
	) {
		this.loading = this.showLoading();
		this.moment = moment;
	}

	ionViewDidEnter() {
		this.resetProps()
		this.loadAllPatients();
	}

	resetProps() {
		this.patientsList = new Array<object>();
	}

	loadAllPatients() {
		let patientsFilter = this.navParams.get('patients') || false,
			hasEvaluation;

		this.userService.getUserByNutriUid(this.navParams.get('key')).then(
			(doc) => {
				doc.forEach((user) => {
					if (!patientsFilter || patientsFilter.includes(user.doc.id)) {
						this.patientsList.push(Object.assign(user.doc.data(), { 
							key: user.doc.id 
						}));
					}
				});
			}
		).then(final => {
			console.log(this.patientsList);
			this.loading.dismiss();
		});
	}

	getAppointment(appointmentDate, appointmentTime) {
		if (!appointmentDate) {
			return "Sem consulta agendada.";
		}
		
		return this.moment(appointmentDate).format("DD/MM/YYYY") + " " + appointmentTime; 
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
  		let params = Object.assign({key: this.navParams.get('key')}, patientData);

  		this.navCtrl.push(AppointmentPage, params);
  	}

  	evaluationResultPage(patientData) {
  		let params = Object.assign({key: this.navParams.get('key')}, patientData)

		this.navCtrl.push(EvaluationresultPage, params);
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
