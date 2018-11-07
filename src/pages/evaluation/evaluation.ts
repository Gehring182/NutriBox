import { Component, ViewChild } from '@angular/core';
import { Slides, IonicPage, NavController, NavParams } from 'ionic-angular';
import { EvaluationService } from '../../providers/evaluation/evaluation';
import { EvaluationUserService } from '../../providers/evaluationuser/evaluationuser';
import { EventService } from '../../providers/event/event';
import { UserService } from '../../providers/user/user';
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
		public eventService: EventService,
		public userService: UserService
	) {
		this.questionList = new Array<object>();
		this.last = 0;
		this.optQuestionChosen = {};
		this.questionGroupAnswer = {};
		this.questionAnswer = {};
		this.uidUser = this.navParams.get("key");
		this.fetchQuestions();
	}

	optionChose(question: string, choice: string) {
		this.optQuestionChosen[question] = {answer: choice};
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
		let answers = [];
		
		if (Object.keys(this.optQuestionChosen).length > 0) {
			let optQuestionChosen = this.optQuestionChosen;
			
			Object.keys(optQuestionChosen).map((key, index) => {
				answers.push({
					question: key,
					answer: optQuestionChosen[key].answer
				});
			});
		}

		if (Object.keys(this.questionGroupAnswer).length > 0) {
			let questionGroupAnswer = this.questionGroupAnswer,
				groupAnswer = {};
				
			Object.keys(questionGroupAnswer).map((key, index) => {
				if (!groupAnswer[questionGroupAnswer[key].group]) {
					groupAnswer[questionGroupAnswer[key].group] = [];
				}

				groupAnswer[questionGroupAnswer[key].group].push({
					question: key, 
					groupanswer: questionGroupAnswer[key] 
				});
			});

			answers.push(groupAnswer);
		}

		if (Object.keys(this.questionAnswer).length > 0) {
			answers.push({ 
				question: this.questionAnswer.question,
				groupanswer: {
					desc0: this.questionAnswer.desc0,
					desc1: this.questionAnswer.desc1,
					desc2: this.questionAnswer.desc2
				}
			});
		}

		this.evalUserService.create({uiduser: this.uidUser, question: answers});
		this.userService.update(this.uidUser, {evaluationAnswered: true});
		this.optQuestionChosen = {};
		this.questionGroupAnswer = {};
		this.questionAnswer = {};

		this.navCtrl.pop();
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
