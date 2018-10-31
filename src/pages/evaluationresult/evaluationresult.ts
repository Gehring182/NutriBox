import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EvaluationUserService } from '../../providers/evaluationuser/evaluationuser';

@IonicPage()
@Component({
	selector: 'page-evaluationresult',
	templateUrl: 'evaluationresult.html',
})
export class EvaluationresultPage {

	questionsAnswer: Array<any>;
	questionsGroupAnswer: Array<any>;
	questionsDescAnswer: Array<any>;

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		public evalUserService: EvaluationUserService
	) {
		this.questionsAnswer = [];
		this.questionsGroupAnswer = []; 
		this.questionsDescAnswer = [];

		this.loadEvaluationResult();
	}

	ionViewDidLoad() {
	
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
			console.log(this.questionsDescAnswer);
		});
	}

}