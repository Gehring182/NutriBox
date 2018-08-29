import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { User } from '../../models/user.models';

@Injectable()
export class UserService {

	users: Observable<any[]>;
	usersCollection: AngularFirestoreCollection<User>;

	constructor(public afs: AngularFirestore, public http: Http) {
		this.usersCollection = afs.collection('users');
		this.users = this.usersCollection.valueChanges();
	}

	create(user: User) {
		return this.usersCollection.add(user);
	}

}
