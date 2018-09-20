import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Event } from '../../models/event.models';

@Injectable()
export class EventService {

	eventsCollection: AngularFirestoreCollection<Event>;

	constructor(
		public afs: AngularFirestore, 
		public http: Http,
		public db: AngularFireDatabase
	) {
		this.eventsCollection = this.afs.collection('events');
	}

	create(event: Event) {
		return this.eventsCollection.add(event);
	}

	update(key: string, data: object) {
		this.eventsCollection.doc(key).update(data).then(() => {});
	}

	/*getUserByEmail(email: string) {
		let refDb = this.afs.collection('users');
		return refDb.ref.where('email', '==', email).get().then((documentSnapshot) => {
			return documentSnapshot.docChanges();
		});
	}*/

	//exemplo chamada
	/*this.userService.getUserByUid(this.auth.user.uid).then((doc) => {
		this.navCtrl.setRoot(MainPage, doc);
	});*/
	/*getUserByUid(uid: string) {
		let refDb = this.afs.collection<User>('users').doc(uid);
		return refDb.ref.get().then(function(documentSnapshot) {
			return documentSnapshot.data();
		});
	}*/
	//exemplo chamada em home.ts onLogin
	//Usuários que completaram cadastro, desde o ultimo acesso
	getLastUsersSignedUp(uid: string, date: Date) {
		let refDb = this.afs.collection('events');
		return refDb.ref
			.where('type', '==', 1)
			.where('uidto', '==', uid)
			.where('eventdate', '>=', date).get().then((documentSnapshot) => {
				return documentSnapshot.docChanges();
		});
	}
}
