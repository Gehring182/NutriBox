import { Component } from '@angular/core';
import { Loading, LoadingController, NavController } from 'ionic-angular';
import { MainPage } from '../main/main';
import { ProfilePage } from '../profile/profile';
import { ChooseprofilePage } from '../chooseprofile/chooseprofile';
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
			loading: Loading = this.showLoading(),
			userData;

		this.auth.signInWithEmail({
			email: data.email,
			password: data.password
		}).then(
			(user) => {
				this.userService.getUserByAuthUid(user.user.uid).then(
					(doc) => {
						doc.forEach((user) => {
							userData = Object.assign(user.doc.data(), {key: user.doc.id});
							if (userData.crn) {
								loading.dismiss();
								this.navCtrl.setRoot(MainPage, userData);	
							} else {
								loading.dismiss();
								this.navCtrl.setRoot(ProfilePage, userData);
							}
						})
					},
					error => {
		                loading.dismiss();
		                //this.signupError = error.message;
		            }
				);
			},
			error => {
				loading.dismiss();
				this.loginError = error.message;
			}
		);
	}

	onChooseProfile() {
		this.navCtrl.push(ChooseprofilePage);
	}

	showLoading(): Loading {
  		let loading: Loading = this.loadingCtrl.create({
  			content: 'Por favor, aguarde...'
  		});
  		loading.present();
  		return loading;
  	}

}
