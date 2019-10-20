import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { DBService, People } from '../services/db.service';
import { AddskillPage } from '../modals/addskill/addskill.page';
import { AngularFireAuthModule } from 'angularfire2/auth';
import * as firebase from 'firebase/app';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: firebase.User;

  constructor(private authService: AuthService, private dbService: DBService, private modalController: ModalController,
              private firebaseAuth: AngularFireAuthModule ) {
  }

  ngOnInit() {

    /* console.log(currentUser);*/
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        this.user = user;
      }
    });

  }

  async presentAddSkillModal() {
    console.log(this.user);
    const modal = await this.modalController.create({
      component: AddskillPage
    });
    return await modal.present();
  }

}
