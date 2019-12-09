import { NotificationsPageModule } from './notifications/notifications.module';
import { SignInPageModule } from './sign-in/sign-in.module';
import { SuccessPagePageModule } from './success-page/success-page.module';
import { BookingModalPageModule } from './booking-modal/booking-modal.module';
import { RegisterPageModule } from './register/register.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { AuthGuardService } from './auth-guard.service';






@NgModule({
  declarations: [AppComponent ],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, NotificationsPageModule, BookingModalPageModule, RegisterPageModule, SuccessPagePageModule, SignInPageModule],
  providers: [
    StatusBar,
    AuthGuardService,
    SplashScreen,
    OneSignal,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
