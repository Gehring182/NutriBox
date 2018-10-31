export class User {
	constructor(
		public name: string,
		public birth: Date,
		public email: string,
		public password: string,
		public crn: string,
		public uid: string,
		public nutri: string,
		public lastSession: Date,
		public gender: string,
		public appointmentDate: Date,
		public appointmentTime: string,
		public evaluationAnswered: boolean){}
}