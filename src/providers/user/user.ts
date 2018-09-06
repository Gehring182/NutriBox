import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { User } from '../../models/user.models';

@Injectable()
export class UserService {

	usersCollection: AngularFirestoreCollection<User>;

	constructor(
		public afs: AngularFirestore, 
		public http: Http,
		public db: AngularFireDatabase
	) {
		this.usersCollection = afs.collection<User>('users');
	}

	create(user: User) {
		return this.usersCollection.add(user);
	}

	setUid(key: string, uid: string) {
		this.usersCollection.doc(key).update({uid: uid}).then(() => {});
	}

	getUserByUid(uid: string) {
		let referenceDb = this.afs.collection('users').doc(uid);

		return referenceDb.ref.get().then(function(userSnapshot) {
			return userSnapshot.data();
		});
	}
}
