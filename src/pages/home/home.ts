import { Component } from '@angular/core';
import { Loading, LoadingController, NavController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { MainPage } from '../main/main';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../providers/auth/auth';
import { UserService } from '../../providers/user/user';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	loginForm: FormGroup;
	loginError: string;

	constructor(
		public formBuilder: FormBuilder,
		private auth: AuthService,
		public navCtrl: NavController,
		public userService: UserService,
  		public loadingCtrl: LoadingController
	) {

		let emailRegularExpression = /^[a-zA-Z0-9][a-zA-Z0-9\._-]+@([a-zA-Z0-9\._-]+\.)[a-zA-Z-0-9]{2,3}/;

  		this.loginForm = this.formBuilder.group({
  			email: ['', [Validators.compose([Validators.required, Validators.pattern(emailRegularExpression)])]],
  			password: ['', [Validators.required]]
  		});

	}

	onLogin() {
		let data = this.loginForm.value,
			loading: Loading = this.showLoading();
		
		this.auth.signInWithEmail({
			email: data.email,
			password: data.password
		}).then(
			() => {
				loading.dismiss();
				this.navCtrl.setRoot(MainPage, {
					uid: this.auth.user.uid
				});
			},
			error => {
				loading.dismiss();
				this.loginError = error.message;
			}
		);

	}

	onSignup() {
		this.navCtrl.push(SignupPage);
	}

	showLoading(): Loading {
  		let loading: Loading = this.loadingCtrl.create({
  			content: 'Por favor, aguarde...'
  		});

  		loading.present();

  		return loading;
  	}

}
