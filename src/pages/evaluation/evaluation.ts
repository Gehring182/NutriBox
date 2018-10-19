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
	optQuestionChosen: any;
	questionGroupAnswer: any;
	questionAnswer: any;
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
		this.optQuestionChosen = {};
		this.questionGroupAnswer = {};
		this.questionAnswer = {};
		this.uidUser = this.navParams.get("key");
		this.fetchQuestions();
	}

	ionViewDidLoad() {
				
	}

	optionChose(choice: object) {
		this.optQuestionChosen = choice;
	}

	groupAnswer(question: string, answer: object) {
		if (this.questionGroupAnswer[question]) {
			this.questionGroupAnswer[question] = Object.assign({}, this.questionGroupAnswer[question], answer);
		} else {
			this.questionGroupAnswer[question] = answer;
		}
	}

	descAnswer(answer: object) {
		this.questionAnswer = Object.assign({}, this.questionAnswer, answer);
	}

	save() {
		if (Object.keys(this.optQuestionChosen).length > 0) {
			this.evalUserService.create(Object.assign({}, this.optQuestionChosen, {uiduser: this.uidUser}));
		}

		if (Object.keys(this.questionGroupAnswer).length > 0) {
			let questionGroupAnswer = this.questionGroupAnswer;
			
			Object.keys(questionGroupAnswer).map((key, index) => {
				this.evalUserService.create(Object.assign({}, {answer: null, groupanswer: questionGroupAnswer[key], question: key}, {uiduser: this.uidUser}));
			});
		}

		if (Object.keys(this.questionAnswer).length > 0) {
			let groupanswer = {
				desc0: this.questionAnswer.desc0,
				desc1: this.questionAnswer.desc1,
				desc2: this.questionAnswer.desc2
			};
			this.evalUserService.create(Object.assign({}, {answer: null, groupanswer: groupanswer, question: this.questionAnswer.question}, {uiduser: this.uidUser}));
		}

		this.optQuestionChosen = {};
		this.questionGroupAnswer = {};
		this.questionAnswer = {};
	}

	finish() {
		let eventData = {
			type: 3,
			eventdate: new Date,
			uidevent: this.uidUser,
			uidto: this.navParams.get("nutri")
		};
		this.eventService.create(eventData);

		this.save();
	}

	next() {
		this.slides.slideNext();
		this.save();
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
