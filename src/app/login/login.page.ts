import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { People } from '../services/people.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private person: People;
  constructor(private authService: AuthService, private navCtrl: NavController, private storage: Storage) { }

  ngOnInit() {
  }

  logInWithTwitter() {
    this.authService.logInWithTwitter().then(res => {
      this.person = {
        handle: res.additionalUserInfo.username,
        name: res.user.displayName,
        photo: res.user.photoURL,
        tagline: null,
        dob: null,
        joined: null,
        website: null,
        email: null,
        location: null 
      }
      
      console.log(this.person);
      

    });
    /* this.authService.logInWithTwitter();
    console.log(this.authService.user);
    this.navCtrl.navigateForward('/home'); */
  }

}
