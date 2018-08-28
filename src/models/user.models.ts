export class User {
	constructor(
		public name: string,
		public birth: Date,
		public email: string,
		public password: string,
		public crn: string){}
}