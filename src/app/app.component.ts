import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from '../providers/auth/auth';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
    rootPage:any = HomePage;

    constructor(
        public platform: Platform, 
        public statusBar: StatusBar, 
        public splashScreen: SplashScreen,
        private auth: AuthService
    ) {
        platform.ready().then(() => {
            statusBar.styleDefault();
            splashScreen.hide();
        });

        this.auth.afAuth.authState.subscribe(
            user => {
                if (user) {
                    //this.rootPage = HomePage; //chamar main
                } else {
                    this.rootPage = HomePage;
                }
            },
            () => {
                this.rootPage = HomePage;
            }
        );
    }
}

