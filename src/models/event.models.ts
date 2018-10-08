//1 - Paciente se cadastrou
//2 - Logout
//
export class Event {
	constructor(
		public type: number,
		public eventdate: Date,
		public uidevent: string,
		public uidto: string){}
}