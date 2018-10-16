import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';
import { Evaluation } from '../../models/evaluation.models';

@Injectable()
export class EvaluationService {

	evaluationCollection: AngularFirestoreCollection<Evaluation>;

	constructor(
		public afs: AngularFirestore, 
		public http: Http,
		public db: AngularFireDatabase
	) {
		this.evaluationCollection = this.afs.collection('evaluation');
	}

	get AllQuestions() {
		let refDb = this.afs.collection('evaluation');
		return refDb.ref.orderBy("seq", "asc").get().then((documentSnapshot) => {
			return documentSnapshot.docChanges();
		});
	}
}
