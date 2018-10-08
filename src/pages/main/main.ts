import { Component } from '@angular/core';
import { ToastController, Loading, LoadingController, IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { UserService } from '../../providers/user/user';
import { AuthService } from '../../providers/auth/auth';
import { EventService } from '../../providers/event/event';
import { HomePage } from '../home/home';
import { PatientlistPage } from '../patientlist/patientlist';

@IonicPage()
@Component({
	selector: 'page-main',
	templateUrl: 'main.html'
})
export class MainPage {

	cntAllPatients: number;
	cntLastPatientsSignedUp: number;
	lastPatientsSignedUp: string;
	lastPatientsSignedUpNames: string;

	constructor(
		public navCtrl: NavController, 
		public alertCtrl: AlertController,
		public navParams: NavParams,
		public userService: UserService,
		public authService: AuthService,
		public eventService: EventService,
		public loadingCtrl: LoadingController,
		public toastCtrl: ToastController
	) {
		this.cntAllPatients = 0;
		this.cntLastPatientsSignedUp = 0;
		this.lastPatientsSignedUpNames = "";
	}

	ionViewDidLoad() {
		this.loadPatientsSignedUp();
		this.loadAllPatients();
	}

	get MainHeader() {
		let hr = new Date().getHours();
		if (hr > 18 || hr < 4) {
			return "Boa noite " + this.navParams.get('name');
		}

		if (hr > 12) {
			return "Boa tarde " + this.navParams.get('name');
		}

		return "Bom dia " + this.navParams.get('name'); 
	}

	showPatientPrompt() {
		let key = this.navParams.get('key'),
			me = this;

		const prompt = this.alertCtrl.create({
			title: 'Adicionar paciente!',
			message: "Informe os dados do paciente:",
		  	inputs: [
		  		{
			    	name: 'name',
			    	placeholder: 'Nome'
			    }, {
			    	name: 'email',
			    	placeholder: 'E-mail'
			    }
		  	],
			buttons: [
				{
					text: 'Cancelar',
				  	handler: data => {}
				}, {
				  	text: 'Confirmar',
				  	handler: data => {
				  		if (data.email == "") {
				  			me.showToast("E-mail não preenchido!");
				  			return false;
				  		}

				  		let loading: Loading = this.showLoading()
				  		this.userService.create(Object.assign(data, {nutri: key})).then(
				  			(uid) => {
				  				loading.dismiss();
				  				this.showAlert(data.name);
				            },
				            error => {
				                loading.dismiss();
				            }
				        );
				  	}
				}
			]
		});

		prompt.present();
	}

	showToast(message) {
		let toast = this.toastCtrl.create({
			message: message,
			duration: 2000,
			position: 'top'
		});

		toast.present();
	}

	showPatientsSigned() {
		let subTitle = this.lastPatientsSignedUpNames;

		const alert = this.alertCtrl.create({
			title: 'Novos pacientes!',
			subTitle: subTitle,
			buttons: ['OK']
		});

		alert.present();
	}

	patientsListPage() {
		this.navCtrl.push(PatientlistPage, {
			key: this.navParams.get('key'), 
			name: this.navParams.get('name')
		});
	}

	loadPatientsSignedUp() {
		let patients = [];
		
		if (Boolean(this.navParams.get('lastSession'))) {
			this.eventService.getLastUsersSignedUp(this.navParams.get('key'), this.navParams.get('lastSession'))
			.then((doc) => {
				doc.forEach((event) => {
					this.cntLastPatientsSignedUp++;
					patients.push(event.doc.data().uidevent);
				});
			}).then(() => {
				patients.forEach((patient) => {
					this.userService.getUserByUid(patient)
					.then((doc) => {
						this.lastPatientsSignedUpNames += "- " + doc.name + "<br>";
					}).then((final) => {
						this.lastPatientsSignedUp = (this.cntLastPatientsSignedUp == 1) ? " paciente se cadastrou." : " pacientes se cadastraram.";
					});
				});
			});
		}
	}

	loadAllPatients() {
		this.userService.getUserByNutriUid(this.navParams.get('key')).then(
			(doc) => {
				doc.forEach((user) => {
					this.cntAllPatients++;
				})
			}
		);
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

	showAlert(patientName) {
	    const alert = this.alertCtrl.create({
	      	title: 'Paciente adicionado!',
	      	subTitle: 'Assim que ' + patientName + ' se cadastrar, vocês poderão iniciar o acompanhamento.',
	      	buttons: ['OK']
	    });
	    alert.present();
	}

	showLoading(): Loading {
  		let loading: Loading = this.loadingCtrl.create({
  			content: 'Por favor, aguarde...'
  		});
  		loading.present();
  		return loading;
  	}
}
