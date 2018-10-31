import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { EvaluationUser } from '../../models/evaluationuser.models';

@Injectable()
export class EvaluationUserService {

	evaluationUserCollection: AngularFirestoreCollection<EvaluationUser>;

	constructor(
		public afs: AngularFirestore, 
		public http: Http,
		public db: AngularFireDatabase
	) {
		this.evaluationUserCollection = this.afs.collection('evaluationuser');
	}

	create(evaluation: any) {
		return this.evaluationUserCollection.add(evaluation);
	}

	getAnswerQuestionUser(uiduser: string, uidquestion: string) {
		let refDb = this.afs.collection('evaluationuser');

		return refDb.ref
			.where('uiduser', '==', uiduser)
			.where('uidquestion', '==', uidquestion).get().then((documentSnapshot) => {
				return documentSnapshot.docChanges();
		});
	}

	getAnswerQuestionsByUser(uid: string) {
		let refDb = this.afs.collection('evaluationuser');

		return refDb.ref
			.where('uiduser', '==', uid).get().then((documentSnapshot) => {
				return documentSnapshot.docChanges();
		});
	}
}
