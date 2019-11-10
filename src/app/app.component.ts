import { Component, OnInit } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';
import { MessageService } from './services/message.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  authenticated = false;
/*
  public appPages = [
    {
      title: 'Connections',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Log In or Join ',
      url: '/login',
      icon: 'log-in'
    },
    {
      title: 'Profile ',
      url: '/profile',
      icon: 'person'
    },
    {
      title: 'Log out ',
      url: '/login',
      icon: 'log-out'
    }

  ];
*/

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private menu: MenuController,
    private authService: AuthService,
    public ms: MessageService
  ) {
    this.initializeApp();
    
  }

  
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    console.log('AppComponent OnInit');
    this.authService.getAuthStatus().subscribe(async authState=>{
      console.log('£££££££££££££££ Subscriber ....  £££££££££££££££££££');
      this.authenticated = authState!= null ? true : false;
      if(this.authenticated)
        {
         // await this.ms.initChats();
          await this.ms.initMessageSubscriptionGlobal();
        }
    });
  }

  logout()
  {
    console.log('click logout');
    this.authService.logout();
    this.menu.close();

  }
}
