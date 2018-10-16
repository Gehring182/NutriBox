import { Component, ViewChild } from '@angular/core';
import { Slides, IonicPage, NavController, NavParams } from 'ionic-angular';
import { EvaluationService } from '../../providers/evaluation/evaluation';
import { EvaluationUserService } from '../../providers/evaluationuser/evaluationuser';
import { EventService } from '../../providers/event/event';
import { ProfilePage } from '../profile/profile';

@IonicPage()
@Component({
  selector: 'page-evaluation',
  templateUrl: 'evaluation.html',
})

export class EvaluationPage {

	questionList: Array<object>;

	last: number;

	questionChosen: any;

	uidUser: string;

	@ViewChild('slides') slides: Slides;

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		public evalService: EvaluationService,
		public evalUserService: EvaluationUserService,
		public eventService: EventService
	) {
		this.questionList = new Array<object>();
		this.last = 0;
		this.questionChosen = {};
		this.uidUser = this.navParams.get("key");
		this.fetchQuestions();
	}

	ionViewDidLoad() {
				
	}

	optionChose(choice: object) {
		this.questionChosen = choice;
	}

	saveOpt() {
		if (this.questionChosen != {}) {
			this.evalUserService.create(Object.assign({}, this.questionChosen, {uiduser: this.uidUser}));
		}
		this.questionChosen = {};
	}

	finish() {
		let eventData = {
			type: 3,
			eventdate: new Date,
			uidevent: this.uidUser,
			uidto: this.navParams.get("nutri")
		};
		this.eventService.create(eventData);

		this.saveOpt();
	}

	next() {
		this.slides.slideNext();
		//this.saveOpt();
	}

	previous() {
		this.slides.slidePrev();
	}

	fetchQuestions() {
		this.evalService.AllQuestions.then(
			(doc) => {
				this.last = doc.length - 1;
				doc.forEach((question) => {
					this.questionList.push(Object.assign({}, {key: question.doc.id}, question.doc.data()));
				});
			}
		).then(final => {
			
		});
	}
}
