import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController, Loading, LoadingController} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../providers/user/user';
import { EventService } from '../../providers/event/event';
import { PatientlistPage } from '../patientlist/patientlist';

@IonicPage()
@Component({
  selector: 'page-appointment',
  templateUrl: 'appointment.html',
})
export class AppointmentPage {

	appointmentForm: FormGroup;
	reschedule: boolean;

	constructor(
		public formBuilder: FormBuilder,
		public userService: UserService,
		public eventService: EventService,
		public viewCtrl: ViewController,
		public navCtrl: NavController, 
		public navParams: NavParams,
		public loadingCtrl: LoadingController
	) {

		this.appointmentForm = this.formBuilder.group({
  			appointmentDate: ['', [Validators.required]],
  			appointmentHour: ['', [Validators.required]]
  		});

  		this.reschedule = this.navParams.get('appointmentDate');
	}

	ionViewDidLoad() {
	}

	get AppointmentHeader() {
		return (this.navParams.get('name') || this.navParams.get('email'));
	}

	onSubmit() {
  		let loading: Loading = this.showLoading();

  		this.userService.update(this.navParams.get('key'), {
  			appointmentDate: this.appointmentForm.value.appointmentDate,
  			appointmentTime: this.appointmentForm.value.appointmentHour
  		}).then(
			(bool) => {
				if (this.reschedule) {
					let eventData = {
						type: this.eventService.type.EVENT_RESCHEDULED,
						eventdate: new Date,
						uidevent: this.navParams.get('nutri'),
						uidto: this.navParams.get('key') 
					};
					this.eventService.create(eventData);
				}

				loading.dismiss();
				this.navCtrl.pop();
			}
		);
  	}

  	showLoading(): Loading {
  		let loading: Loading = this.loadingCtrl.create({
  			content: 'Por favor, aguarde...'
  		});

  		loading.present();
  		return loading;
  	}
}
