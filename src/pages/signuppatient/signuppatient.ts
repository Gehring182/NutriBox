import { Component } from '@angular/core';
import { Loading, LoadingController, IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../providers/user/user';
import { AuthService } from '../../providers/auth/auth';
import { HomePage } from '../../pages/home/home';

@IonicPage()
@Component({
  selector: 'page-signuppatient',
  templateUrl: 'signuppatient.html',
})
export class SignuppatientPage {

	signupPatientForm: FormGroup;
    signupPatientError: string;

	constructor(
		public formBuilder: FormBuilder, 
  		public navCtrl: NavController, 
  		public navParams: NavParams,
  		public userService: UserService,
  		public authService: AuthService,
  		public loadingCtrl: LoadingController,
  		public alertCtrl: AlertController
	) {
		let emailRegularExpression = /^[a-zA-Z0-9][a-zA-Z0-9\._-]+@([a-zA-Z0-9\._-]+\.)[a-zA-Z-0-9]{2,3}/;

  		this.signupPatientForm = this.formBuilder.group({
  			name: ['', [Validators.required, Validators.minLength(3)]],
  			birth: ['', [Validators.required]],
  			email: ['', [Validators.compose([Validators.required, Validators.pattern(emailRegularExpression)])]],
  			password: ['', [Validators.required, Validators.minLength(6)]]
  		});
	}

	onSubmit() {
  		let loading: Loading = this.showLoading(), userData;

  		this.userService.getUserByEmail(this.signupPatientForm.value.email).then(
  			(doc) => {
  				debugger;
  				if (!doc.length) {
  					this.showAlert("Usuário não encontrado!", "O e-mail informado não foi previamente cadastrado por seu nutricionista.");
					loading.dismiss();
  				} else {
  					doc.forEach((user) => {;
						userData = user.doc.data()
						
						if (userData.uid) {
							this.showAlert("Usuário já possui cadastro!", "O e-mail informado já foi cadastrado.");
							loading.dismiss();
			  				return;
						}

						this.authService.createAuthUser({
				  			email: this.signupPatientForm.value.email,
				  			password: this.signupPatientForm.value.password
				  		}, user.doc.id);
						this.userService.update(user.doc.id, this.signupPatientForm.value);
						loading.dismiss();
			  			this.navCtrl.push(HomePage);
					});
  				}
			},
			error => {
                loading.dismiss();
                //this.signupError = error.message;
            }




			/*if (!doc) {
				this.showAlert("Usuário não encontrado!", "O e-mail informado não foi previamente cadastrado por seu nutricionista.");
				loading.dismiss();
  				this.navCtrl.push(HomePage);
  				return;
			} 
			
			if (doc.uid) {
				this.showAlert("Usuário já possui cadastro!", "O e-mail informado já foi cadastrado.");
				loading.dismiss();
  				this.navCtrl.push(HomePage);
  				return;
			}*/
		);


        //cria o usuário
        /*this.userService.create(this.signupPatientForm.value).then(
            (uid) => {
  				//cadastra autenticação
  				this.authService.createAuthUser({
		  			email: this.signupPatientForm.value.email,
		  			password: this.signupPatientForm.value.password
		  		}, uid.id);
  				loading.dismiss();
  				this.navCtrl.push(HomePage);
            },
            error => {
                loading.dismiss();
                this.signupPatientError = error.message;
            }
        );*/
  	}

  	showAlert(title, message) {
	    const alert = this.alertCtrl.create({
	      	title: title,
	      	subTitle: message,
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

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad SignuppatientPage');
  	}
}
