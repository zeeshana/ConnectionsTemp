import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { People, DBService } from '../services/db.service'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private person: People;
  constructor(private authService: AuthService, private navCtrl: NavController, private storage: Storage,
    private dbService: DBService) { }

  ngOnInit() {
  }

  logInWithTwitter() {
    this.authService.logInWithTwitter().then(response => {
      const res: any = response;

      this.person = {
        handle: res.additionalUserInfo.username,
        name: res.user.displayName,
        photo: res.user.photoURL,
        tagline: res.additionalUserInfo.profile.description,
        dob: null,
        joined: new Date(),
        website: res.additionalUserInfo.profile.entities.url.urls[0].display_url,
        email: res.user.email,
        location: res.additionalUserInfo.profile.location,
        accessToken: res.credential.accessToken,
        secret: res.credential.secret,
        signInMethod: res.credential.signInMethod,
        providerId: res.credential.providerId,
        uid: res.user.uid,
        updated_profile: false,
        role: 'user'
      };

      // TODO: Check before adding the user if the user alread exists

      let personExiting = this.dbService.getPerson(this.person.handle);
      if(personExiting.handle != null) {
        // Here just make some updates if required. Maybe access tokens etc.
        if(personExiting.updated_profile == null || personExiting.updated_profile == false) {
          this.navCtrl.navigateForward('/profile');
        } else {
          this.navCtrl.navigateForward('/home');
        }
      }  else {
        this.dbService.addPerson(this.person);
        this.navCtrl.navigateForward('/profile');
      }
      
      this.storage.set('loggedinUser', this.person);
      

    });
  }

}
