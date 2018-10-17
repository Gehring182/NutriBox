export class EvaluationUser {
	constructor(
		public uiduser: string,
		public question: string,
		public answer: string,
		public groupanswer: object
		){}
}