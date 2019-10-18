import { Injectable } from '@angular/core';

import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<firebase.User>;

  constructor(private firebaseAuth: AngularFireAuth) {
    this.user = firebaseAuth.authState;

    // Use the following for authentication
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        this.user = user;
      }
    });

  }

  logInWithTwitter() {
    return this.firebaseAuth.auth.signInWithRedirect( 
      new firebase.auth.TwitterAuthProvider()
    );
  }

  getTwitterProfilePhoto() {

  }

  getCurrentUser() {
    return firebase.auth().currentUser;
  }

  getUser() {
    return this.user;
  }
}
