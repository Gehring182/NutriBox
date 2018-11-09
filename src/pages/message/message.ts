import { Component } from '@angular/core';
import { Loading, LoadingController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventService } from '../../providers/event/event';

@IonicPage()
@Component({
  selector: 'page-message',
  templateUrl: 'message.html',
})
export class MessagePage {

	messageForm: FormGroup;
    messageError: string;

	constructor(
		public formBuilder: FormBuilder,
		public navCtrl: NavController, 
		public navParams: NavParams,
		public loadingCtrl: LoadingController,
		public eventService: EventService
	) {
		this.messageForm = this.formBuilder.group({
  			desc: ['', [Validators.required]],
  			category: ['', [Validators.required]]
  		});
	}

	ionViewDidLoad() {
	
	}

	get Header() {
		return (this.navParams.get('name') || this.navParams.get('email'));
	}

	onSubmit() {
  		let loading: Loading = this.showLoading();
  		
  		let eventData = {
			type: 4,
			eventdate: new Date,
			uidevent: this.navParams.get("nutri"),
			uidto: this.navParams.get("key"),
			desc: this.messageForm.value.desc,
			answer: null,
			category: this.messageForm.value.category
		};
		this.eventService.create(eventData);

		loading.dismiss();
		this.navCtrl.pop();
  	}

  	showLoading(): Loading {
  		let loading: Loading = this.loadingCtrl.create({
  			content: 'Por favor, aguarde...'
  		});

  		loading.present();
  		return loading;
  	}
}
