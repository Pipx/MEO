import firebase from "firebase";
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { ModalContentPage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { AddItemPage, addNewCategoryModal } from './../pages/addItem/addItem';

import { ComponentsModule } from '../components/components.module';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HttpModule } from '@angular/http';
import { ServerService } from './server.service';

@NgModule({
  declarations: [
    MyApp,
    AddItemPage,
    ContactPage,
    HomePage,
    TabsPage,
    ModalContentPage,
    addNewCategoryModal,
    LoginPage,
    RegisterPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    //AngularFireModule.initializeApp(firebaseConfig.fire),
    // AngularFireAuthModule,
    // AngularFireDatabaseModule,
    ComponentsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AddItemPage,
    ContactPage,
    HomePage,
    TabsPage,
    ModalContentPage,
    addNewCategoryModal,
    LoginPage,
    RegisterPage
  ],
  providers: [
    ServerService,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {
  app = firebase.initializeApp({
      apiKey: "AIzaSyCUhRnZXtkAbTXBu-1J04YngZzRvpUGNxM",
      authDomain: "meo-db.firebaseapp.com",
      databaseURL: "https://meo-db.firebaseio.com",
      projectId: "meo-db",
      storageBucket: "meo-db.appspot.com",
      messagingSenderId: "620942963187"
  });
}
