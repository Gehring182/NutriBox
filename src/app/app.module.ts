import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';

import { AngularFireModule, FirebaseAppConfig } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SignupPage } from '../pages/signup/signup';
import { MainPage } from '../pages/main/main';
import { PatientPage } from '../pages/patient/patient';
import { UserService } from '../providers/user/user';
import { AuthService } from '../providers/auth/auth'; 

const firebaseAppConfig: FirebaseAppConfig = {
    apiKey: "AIzaSyB_WskBa3DkS1uXaYYK_oTdJgxGe-DMRdg",
    authDomain: "nutriproject-1dec5.firebaseapp.com",
    databaseURL: "https://nutriproject-1dec5.firebaseio.com",
    projectId: 'nutriproject-1dec5',
    storageBucket: "nutriproject-1dec5.appspot.com",
    messagingSenderId: "392998095234"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SignupPage,
    MainPage,
    PatientPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseAppConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SignupPage,
    MainPage,
    PatientPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserService,
    AuthService,
    AngularFireAuth
  ]
})
export class AppModule {}
