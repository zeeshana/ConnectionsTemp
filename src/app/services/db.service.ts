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


  updateProfile(personToUpdate) {
    console.log(personToUpdate);
    var person = new this.Person();
    person.set("objectId", personToUpdate.objectId);
    person.set("name", personToUpdate.name);
    person.set("tagline", personToUpdate.tagline);
    person.set("website", personToUpdate.website);
    person.set("location", personToUpdate.location);
    person.save().then( result => {
      console.log(result);
    });

  }

  addPersonDummy() {

    var person = new this.Person();
    person.set("handle", "naval");
    person.set("name", "Naval");
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
    
    const Skill = Parse.Object.extend("Skill");
    const skillJava = new Skill();
    skillJava.set("name", "Java");

    const skillAngular = new Skill();
    skillAngular.set("name", "Angular");

    const Duration = Parse.Object.extend("Duration");
    const durationJava1 = new Duration();
    durationJava1.set("startDate", new Date());
    durationJava1.set("endDate", new Date());

    const durationJava2 = new Duration();
    durationJava2.set("startDate", new Date());
    durationJava2.set("endDate", new Date());

    const durationJava3 = new Duration();
    durationJava3.set("startDate", new Date());
    durationJava3.set("endDate", new Date());

    durationJava1.save().then( (install) => {
      
      durationJava2.save().then( (install) => {
        console.log(install);
      } );

      durationJava3.save().then( (install) => {
        const durations = new Array();
        durations.push(durationJava1);
        durations.push(durationJava2);
        durations.push(durationJava3);
    
        const durations2 = new Array();
        durations2.push(durationJava1);
        durations2.push(durationJava2);
        durations2.push(durationJava3);

        skillJava.set("durations", durations);
        skillJava.set("durationMonths", 24);
        skillAngular.set("durations", durations2);
        skillAngular.set("durationMonths", 24);


        skillJava.save().then( (install) => {
          console.log(install);
        } );
        
        skillAngular.save().then( (install) => {
          console.log(install);
        } );
    
        const skillsArray = new Array();
        skillsArray.push(skillJava);
        skillsArray.push(skillAngular);
    
        person.set("skills", skillsArray);
    
    
        person.save().then((install) => {
          return "ok";
        }, (install, error) => {
          return "fail"
        });


      } );


    } );


  }

  async getPeople(){
    var query = new Parse.Query(this.Person); 
    query.include("skills");
    return await query.find()
  } 

   async getPerson(key: string, value: string) {
    const query = new Parse.Query(this.Person); 
    query.equalTo(key, value);
    const result = await query.first();
    return result;  
   
  }

  logIn(username:String, token:String) {
    return Parse.User.logIn(username, token);
  }

}
