import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../providers/auth/auth';

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
		public navCtrl: NavController
	) {

		let emailRegularExpression = /^[a-zA-Z0-9][a-zA-Z0-9\._-]+@([a-zA-Z0-9\._-]+\.)[a-zA-Z-0-9]{2,3}/;

  		this.loginForm = this.formBuilder.group({
  			email: ['', [Validators.compose([Validators.required, Validators.pattern(emailRegularExpression)])]],
  			password: ['', [Validators.required, Validators.minLength(6)]]
  		});

	}

	onLogin() {
		let data = this.loginForm.value,
			credentials = {
				email: data.email,
				password: data.password
			};

		if (!data.email) {
			return;
		}

		this.auth.signInWithEmail(credentials).then(
			() => console.log("Sucesso, usuário pode logar."),
			error => this.loginError = error.message
		);

	}

	onSignup() {
		this.navCtrl.push(SignupPage);
	}

}
