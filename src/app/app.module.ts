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
import { ProfilePage } from '../pages/profile/profile';
import { ChooseprofilePage } from '../pages/chooseprofile/chooseprofile';
import { SignuppatientPage } from '../pages/signuppatient/signuppatient';
import { PatientlistPage } from '../pages/patientlist/patientlist';
import { AppointmentPage } from '../pages/appointment/appointment';
import { EvaluationPage } from '../pages/evaluation/evaluation';

import { UserService } from '../providers/user/user';
import { EventService } from '../providers/event/event';
import { AuthService } from '../providers/auth/auth';
import { EvaluationService } from '../providers/evaluation/evaluation';
import { EvaluationUserService } from '../providers/evaluationuser/evaluationuser';

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
        PatientPage,
        ProfilePage,
        ChooseprofilePage,
        SignuppatientPage,
        PatientlistPage,
        AppointmentPage,
        EvaluationPage
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
        PatientPage,
        ProfilePage,
        ChooseprofilePage,
        SignuppatientPage,
        PatientlistPage,
        AppointmentPage,
        EvaluationPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        UserService,
        EventService,
        AuthService,
        EvaluationService,
        EvaluationUserService,
        AngularFireAuth
    ]
})
export class AppModule {}
