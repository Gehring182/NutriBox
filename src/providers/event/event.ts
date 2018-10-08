import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Event } from '../../models/event.models';

@Injectable()
export class EventService {

	eventsCollection: AngularFirestoreCollection<Event>;
	type: any;

	constructor(
		public afs: AngularFirestore, 
		public http: Http,
		public db: AngularFireDatabase
	) {
		this.eventsCollection = this.afs.collection('events');

		//Tipos de evento
		this.type = {
			EVENT_USERS_SIGNEDUP: 1,
			EVENT_RESCHEDULED: 2
		};
	}

	create(event: Event) {
		return this.eventsCollection.add(event);
	}

	update(key: string, data: object) {
		this.eventsCollection.doc(key).update(data).then(() => {});
	}

	//Usuários que completaram cadastro, desde o ultimo acesso
	getLastUsersSignedUp(uid: string, date: Date) {
		let refDb = this.afs.collection('events');

		return refDb.ref
			.where('type', '==', this.type.EVENT_USERS_SIGNEDUP)
			.where('uidto', '==', uid)
			.where('eventdate', '>=', date).get().then((documentSnapshot) => {
				return documentSnapshot.docChanges();
		});
	}

	//Consulta reagendada pelo nutricionista, desde o ultimo acesso
	getAppointmentRescheduled(uid: string, date: Date) {
		let refDb = this.afs.collection('events');

		return refDb.ref
			.where('type', '==', this.type.EVENT_RESCHEDULED)
			.where('uidto', '==', uid)
			.where('eventdate', '>=', date).get().then((documentSnapshot) => {
				return documentSnapshot.docChanges();
		});
	}
}
