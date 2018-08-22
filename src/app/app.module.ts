import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { AngularFireModule, FirebaseAppConfig } from 'angularfire2';

const firebaseAppConfig: FirebaseAppConfig = {
    apiKey: "AIzaSyB_WskBa3DkS1uXaYYK_oTdJgxGe-DMRdg",
    authDomain: "nutriproject-1dec5.firebaseapp.com",
    databaseURL: "https://nutriproject-1dec5.firebaseio.com",
    storageBucket: "nutriproject-1dec5.appspot.com",
    messagingSenderId: "392998095234"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseAppConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
