import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../providers/user/user';
import { AuthService } from '../../providers/auth/auth';
import { HomePage } from '../../pages/home/home';

@IonicPage()
@Component({
	selector: 'page-signup',
	templateUrl: 'signup.html',
})
export class SignupPage {

	signupForm: FormGroup;

  	constructor(
  		public formBuilder: FormBuilder, 
  		public navCtrl: NavController, 
  		public navParams: NavParams,
  		public userService: UserService,
  		public authService: AuthService
  		) {

  		let emailRegularExpression = /^[a-zA-Z0-9][a-zA-Z0-9\._-]+@([a-zA-Z0-9\._-]+\.)[a-zA-Z-0-9]{2,3}/;

  		this.signupForm = this.formBuilder.group({
  			name: ['', [Validators.required, Validators.minLength(3)]],
  			birth: ['', [Validators.required]],
  			email: ['', [Validators.compose([Validators.required, Validators.pattern(emailRegularExpression)])]],
  			crn: ['', [Validators.minLength(5)]],
  			password: ['', [Validators.required, Validators.minLength(6)]]
  		});
  	}

  	onSubmit(): void {
  		//cria o usuário
  		this.userService.create(this.signupForm.value).then(
  			() => {
  				//cadastra autenticação
  				this.authService.createAuthUser({
		  			email: this.signupForm.value.email,
		  			password: this.signupForm.value.password
		  		});
  				console.log('Usuário cadastrado!');
  				this.navCtrl.push(HomePage);
  		});
  	}

}
