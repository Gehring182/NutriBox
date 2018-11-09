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
	cntEvaluationFinished: number;
	cntPatientsNoAppointment: number;
	cntPatientsNoSignedup: number;
	cntLastPatientsSignedUp: number;
	cntPatientsAnsweredQuestion: number;
	evaluationFinished: Array<any>;
	patientsNoAppointment: Array<any>;
	patientsNoSignedup: Array<any>;
	lastPatientsSignedUp: Array<any>;
	patientsAnsweredQuestion: Array<any>;

	constructor(
		public navCtrl: NavController, 
		public alertCtrl: AlertController,
		public navParams: NavParams,
		public userService: UserService,
		public authService: AuthService,
		public eventService: EventService,
		public loadingCtrl: LoadingController,
		public toastCtrl: ToastController
	) {}

	ionViewDidEnter() {
		this.resetProps();
		this.loadPage();
	}

	resetProps() {
		this.cntAllPatients = 0;
		this.cntLastPatientsSignedUp = 0;
		this.cntEvaluationFinished = 0;
		this.cntPatientsNoAppointment = 0;
		this.cntPatientsNoSignedup = 0;
		this.cntPatientsAnsweredQuestion = 0;
		this.lastPatientsSignedUp = [];
		this.evaluationFinished = [];
		this.patientsNoAppointment = [];
		this.patientsNoSignedup = [];
		this.patientsAnsweredQuestion = [];
	}

	loadPage() {
		this.loadPatientsSignedUp();
		this.loadEvaluationFinished();
		this.loadAllPatients();
		this.loadPatientsAnsweredQuestions();
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
				  				this.loadAllPatients();
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


	patientsListPage(extra: object) {
		let params = {
			key: this.navParams.get('key'), 
			name: this.navParams.get('name')
		};

		if (extra && Object.keys(extra).length > 0) {
			params = Object.assign({}, params, extra);	
		}
		this.navCtrl.push(PatientlistPage, params);
	}

	patientsSignedUpPage() {
		this.patientsListPage({patients: this.lastPatientsSignedUp});
	}

	evaluationFinishedPage() {
		this.patientsListPage({patients: this.evaluationFinished});
	}

	patientsNoAppointmentPage() {
		this.patientsListPage({patients: this.patientsNoAppointment});
	}

	patientsNoSignupPage() {
		this.patientsListPage({patients: this.patientsNoSignedup});
	}

	evaluationAnsweredQuestionPage() {
		this.patientsListPage({patients: this.patientsAnsweredQuestion});	
	}

	loadPatientsSignedUp() {
		if (Boolean(this.navParams.get('lastSession'))) {
			this.eventService.getLastUsersSignedUp(this.navParams.get('key'), this.navParams.get('lastSession'))
			.then((doc) => {
				doc.forEach((event) => {
					this.cntLastPatientsSignedUp++;
					this.lastPatientsSignedUp.push(event.doc.data().uidevent);
				});
			}).then(() => {
				this.lastPatientsSignedUp.forEach((patient) => {
					this.userService.getUserByUid(patient)
					.then((doc) => {

					});
				});
			});
		}
	}

	loadEvaluationFinished() {
		if (Boolean(this.navParams.get('lastSession'))) {
			this.eventService.getEvaluationFinished(this.navParams.get('key'), this.navParams.get('lastSession')).then(
				(doc) => {
					doc.forEach((event) => {
						this.evaluationFinished.push(event.doc.data().uidevent);
						this.cntEvaluationFinished++;
					})
				}
			).then(() => {
			});
		}
	}

	loadAllPatients() {
		this.cntAllPatients = 0;

		this.userService.getUserByNutriUid(this.navParams.get('key')).then(
			(doc) => {
				doc.forEach((user) => {
					this.cntAllPatients++;
					
					if (!user.doc.data().appointmentDate && user.doc.data().birth) {
						this.patientsNoAppointment.push(user.doc.id);
						this.cntPatientsNoAppointment++;
					}

					if (!user.doc.data().birth) {
						this.patientsNoSignedup.push(user.doc.id);
						this.cntPatientsNoSignedup++;
					}
				})
			}
		);
	}

	loadPatientsAnsweredQuestions() {
		this.eventService.getQuestionsAnsweredByNutri(this.navParams.get('key'), this.navParams.get('lastSession')).then(
			(doc) => {
				doc.forEach((question) => {
					if (question.doc.data().answer && !this.patientsAnsweredQuestion.includes(question.doc.data().uidto)) {
						this.patientsAnsweredQuestion.push(question.doc.data().uidto);
						this.cntPatientsAnsweredQuestion++;
					}
				});
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
