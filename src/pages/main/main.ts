import { Component } from '@angular/core';
import { Loading, LoadingController, IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { UserService } from '../../providers/user/user';

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {

	constructor(
		public navCtrl: NavController, 
		public alertCtrl: AlertController,
		public navParams: NavParams,
		public userService: UserService,
		public loadingCtrl: LoadingController
	) {
		console.log(this.navParams.get('uid'));
		console.log(this.navParams.get('crn'));
		console.log(this.navParams.get('birth'));
		console.log(this.navParams.get('name'));
		
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad MainPage');
	}

	get MainHeader() {
		let hr = new Date().getHours();
		if (hr > 18 || hr < 4) {
			return "Boa noite, " + this.navParams.get('name');
		}

		if (hr > 12) {
			return "Boa tarde, " + this.navParams.get('name');
		}

		return "Bom dia, " + this.navParams.get('name'); 
	}

	showPatientPrompt() {
		let crn = this.navParams.get('crn');

		const prompt = this.alertCtrl.create({
			title: 'Novo paciente',
			message: "Por favor, informe o nome e o e-mail do paciente:",
		  	inputs: [
		  		{
		  			name: 'name',
		  			placeholder: 'Nome'
		  		}, {
			    	name: 'email',
			    	placeholder: 'E-mail'
			    }
		  	],
			buttons: [
				{
					text: 'Cancelar',
				  	handler: data => {}
				}, {
				  	text: 'Confirmar',
				  	handler: data => {
				  		let loading: Loading = this.showLoading()
				  		this.userService.create(Object.assign(data, {nutri: crn})).then(
				  			(uid) => {
				  				loading.dismiss();
				  				this.showAlert(data.name);
				            },
				            error => {
				                loading.dismiss();
				            }
				        );
				  	}
				}
			]
		});

		prompt.present();
	}

	showAlert(patientName) {
	    const alert = this.alertCtrl.create({
	      	title: 'Paciente adicionado!',
	      	subTitle: 'Assim que ' + patientName + ' se cadastrar, vocês poderão iniciar o acompanhamento.',
	      	buttons: ['OK']
	    });
	    alert.present();
	}

	showLoading(): Loading {
  		let loading: Loading = this.loadingCtrl.create({
  			content: 'Por favor, aguarde...'
  		});
  		loading.present();
  		return loading;
  	}
	

}
