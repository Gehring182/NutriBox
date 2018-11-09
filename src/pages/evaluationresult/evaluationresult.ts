import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EvaluationUserService } from '../../providers/evaluationuser/evaluationuser';
import { EventService } from '../../providers/event/event';

@IonicPage()
@Component({
	selector: 'page-evaluationresult',
	templateUrl: 'evaluationresult.html',
})
export class EvaluationresultPage {

	nutriQuestionsAnswer: Array<any>;
	questionsAnswer: Array<any>;
	questionsGroupAnswer: Array<any>;
	questionsDescAnswer: Array<any>;

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		public evalUserService: EvaluationUserService,
		public eventService: EventService
	) {
		this.nutriQuestionsAnswer = [];
		this.questionsAnswer = [];
		this.questionsGroupAnswer = []; 
		this.questionsDescAnswer = [];

		this.loadNutriQuestions();
		this.loadEvaluationResult();
	}

	loadNutriQuestions() {
		this.eventService.getQuestionsAnsweredByPatient(this.navParams.get('key'))
		.then((doc) => {
				doc.forEach((question) => {
					if (question.doc.data().answer) {
						this.nutriQuestionsAnswer.push(question.doc.data());
					}
				});
		});
	}

	loadEvaluationResult() {
		this.evalUserService.getAnswerQuestionsByUser(this.navParams.get('key'))
		.then((doc) => {
			doc.forEach((data) => {
				data.doc.data().question.forEach((question) => {
					if (question.answer) {
						this.questionsAnswer.push(question);
					}

					if (question.groupanswer) {
						this.questionsDescAnswer.push(question);
					}

					if (!question.answer && !question.groupanswer) {
						Object.keys(question).map((key) => {
							this.questionsGroupAnswer.push({question: key, answer: question[key]});
						});
					}
				});
			})
		}).then((final) => {
		});
	}

}