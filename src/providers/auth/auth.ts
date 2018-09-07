import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { UserService } from '../../providers/user/user';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {

	public user: firebase.User;

	constructor(
		public afAuth: AngularFireAuth,
		public userService: UserService
	) {
		afAuth.authState.subscribe(user => {
			this.user = user;
		});
	}

	createAuthUser(user: {email: string, password: string}, uid: string) {
		this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password).then((auth) => {
			this.userService.setUid(uid, auth.user.uid);
		});
	}

	get userUid() {
		return this.user.uid;
	}

	signInWithEmail(credentials: {email: string, password: string}) {
		return this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password);
	}

	signOut() {
		this.afAuth.auth.signOut();
	}
}
