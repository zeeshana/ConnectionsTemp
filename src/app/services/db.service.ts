import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import Parse from 'parse';

export interface Person {
  handle: string; // Use the twitter handle
  name: string; // Use the name from Twitter
  tagline: string; // Use the one from Twitter initially
  website: string;
  email: string;
  dob: any;
  joined: any;
  location: string; 
  photo: string;
  accessToken: string;
  providerId: string;
  secret: string;
  signInMethod: string;
  uid: string;
  updated_profile: boolean;
  role: string;
}

@Injectable({
  providedIn: 'root'
}) 
export class DBService {
  
  private Person = Parse.Object.extend("Person");
  private people: any;

  constructor() {
    
    Parse.initialize("z5etbrSgUBGg93mKcmWajXsAU2eDHLkO0Zrsoolb", "X5BDbzZUvn7MmFwyZnQOpB1zwR1WuTGtG10AK9h8");
    Parse.serverURL = 'https://parseapi.back4app.com/';
    
  }

  addPersonDummy() {

    var person = new this.Person();
    person.set("handle", "Naval");
    person.set("name", "naval");
    person.set("tagline", "Vitam impendere vero.");
    person.set("website", "theangelphilosopher.com");
    person.set("website_short_url", "https://t.co/7h5Bg4SvC6?amp=1");
    person.set("email", "naval@naval.com");
    person.set("dob", new Date());
    person.set("joined", new Date());
    person.set("location", "Here");
    person.set("photo", "https://avatars.io/twitter/zaheerbaloch");
    person.set("accessToken", "");
    person.set("providerId", "Twitter");
    person.set("secret", "Twitter");
    person.set("signInMethod", "");
    person.set("uid", "12344556788");
    person.set("publishedProfile", true);
    person.set("role", "user");
    
    person.save().then((install) => {
      return "ok";
    }, (install, error) => {
      return "fail"
    });

  }

  public getPeople() {
    const query = new Parse.Query(this.Person);
    return query.find();
  }

}
