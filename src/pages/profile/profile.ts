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
	patientData: any;
	appointment: string;
	moment: any;
	hasQuestions: boolean;
	hasTips: boolean;
	questionsList: Array<object>;
	tipsList: Array<object>;
	questionsAnswer: object;
	questionsSaved: object;

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		public userService: UserService,
		public authService: AuthService,
		public eventService: EventService
	) {
		this.moment = moment;
		this.resetProps();
		this.fetchData();
		this.loadQuestions();
		this.loadTips();
	}

	loadQuestions() {
		this.eventService.getQuestionsToUser(this.navParams.get('key')).then(
			(doc) => {
				doc.forEach((question) => {
					this.questionsAnswer[question.doc.id] = null;
					this.hasQuestions = true;
					this.questionsSaved[question.doc.id] = false;
					this.questionsList.push(Object.assign({key: question.doc.id}, question.doc.data()));
				});
			}
		);
	}

	loadTips() {
		this.eventService.getTipsToUser(this.navParams.get('key')).then(
			(doc) => {
				doc.forEach((tip) => {
					this.hasTips = true;
					this.tipsList.push(tip.doc.data());
				});
			}
		);
	}

	resetProps() {
		this.nutriData = {};
		this.patientData = {};
		this.appointment = null;
		this.questionsList = new Array<object>();
		this.tipsList =  new Array<object>();
		this.hasQuestions = false;
		this.hasTips = false;
		this.questionsAnswer = {};
		this.questionsSaved = {};
	}

	fetchData() {
		this.userService.getUserByUid(this.navParams.get("nutri")).then((doc) => {
			this.nutriData = doc;
		});

		this.userService.getUserByUid(this.navParams.get('key')).then((doc) => {
			this.patientData = doc;
		});
	}

	submitAnswer(key) {
		this.eventService.update(key, {answer: this.questionsAnswer[key], eventdate: new Date});
		this.questionsSaved[key] = true;
	}

	onChangeAnswer(value, key) {
		this.questionsAnswer[key] = value;
	}

	get AppointmentDate() {
		if (!this.navParams.get("appointmentDate")) {
			return null;
		}

		this.appointment = "Você tem uma consulta agendada para ";

		return this.moment(this.navParams.get("appointmentDate")).format("DD/MM/YYYY") + " " 
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
