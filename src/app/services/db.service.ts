import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
// import { map } from 'rxjs/operators';

import Parse from 'parse';

@Injectable({
  providedIn: 'root'
}) 
export class DBService {
  
  private Person = Parse.Object.extend("Person");
  private people: any;
  observer: Observer<any>;

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

  public getPeople():Observable<any[]> {
    const query = new Parse.Query(this.Person); 
    query.find().then( result => {
      return this.observer.next(result);
    });

    return new Observable(observer => { this.observer = observer});

  } 

 

  public getPerson(key: string, value: string):Observable<any> {
    const query = new Parse.Query(this.Person); 
    query.equalTo(key, value);
    
    query.find().then( result => {
      console.log(result.length);
      return this.observer.next(result);
    });

    return new Observable(observer => { this.observer = observer});

  }

}
