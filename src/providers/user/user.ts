import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { User } from '../../models/user.models';


@Injectable()
export class UserService {

	usersCollection: AngularFirestoreCollection<User>;
	users$: Observable<User[]>;

	constructor(
		public afs: AngularFirestore, 
		public http: Http,
		public db: AngularFireDatabase
	) {
		this.usersCollection = this.afs.collection('users');
		this.users$ = this.usersCollection.valueChanges();
	}

	create(user: User) {
		return this.usersCollection.add(user);
	}

	update(key: string, data: object): Promise<boolean>{
		return this.usersCollection.doc(key).update(data).then(() => {
			return true;
		});
	}

	setUid(key: string, uid: string) {
		this.usersCollection.doc(key).update({
			uid: uid
		}).then(() => {});
	}

	getUserByEmail(email: string) {
		let refDb = this.afs.collection('users');
		return refDb.ref.where('email', '==', email).get().then((documentSnapshot) => {
			return documentSnapshot.docChanges();
		});
	}

	//exemplo chamada
	/*this.userService.getUserByUid(this.auth.user.uid).then((doc) => {
		this.navCtrl.setRoot(MainPage, doc);
	});*/
	getUserByUid(uid: string) {
		let refDb = this.afs.collection<User>('users').doc(uid);
		return refDb.ref.get().then(function(documentSnapshot) {
			return documentSnapshot.data();
		});
	}
	//exemplo chamada em home.ts onLogin
	getUserByAuthUid(uid: string) {
		let refDb = this.afs.collection('users');
		return refDb.ref
		.where('uid', '==', uid).get().then((documentSnapshot) => {
			return documentSnapshot.docChanges();
		});
	}

	getUserByNutriUid(uid: string) {
		let refDb = this.afs.collection('users');

		return refDb.ref
			.where('nutri', '==', uid).get().then((documentSnapshot) => {
				return documentSnapshot.docChanges();
			});
	}
}
