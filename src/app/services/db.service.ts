import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

export interface People {
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

export interface Skill {
  id: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class DBService {
  private peopleCollection: AngularFirestoreCollection<People>;
  private people: Observable<People[]>;

  private skillsCollection: AngularFirestoreCollection<Skill>;
  private skill: Observable<Skill[]>;


  constructor(private db: AngularFirestore) {
    this.peopleCollection = db.collection<People>('people');
    this.skillsCollection = db.collection<Skill>('skills');
    /* this.people = this.peopleCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    ); */

  }

  getPeople() { 
    // return this.people;
    return this.peopleCollection.valueChanges();
  }

  addPerson(person: People) {
    if( person != null ) {
      return this.peopleCollection.doc<People>(person.handle).set(person);
    }
    // return this.peopleCollection.add(person);
  }
  getPerson(id: string) {
    return this.peopleCollection.doc<People>(id).valueChanges();
  }

  getPersonByQuery(key: string, value: string) {
    return this.db.collection('people', ref => ref
      .where(key, '==', value))
      .valueChanges();
  } 

  addSkill(skill: Skill) {
    return this.skillsCollection.doc<Skill>(skill.id).set(skill);
  }

  /* getCategory(id: string) {
    return this.categoriesCollection.doc<Category>(id).valueChanges();
  }

  updateCategory(category: Category, id: string) {
    return this.categoriesCollection.doc(id).update(category);
  }

  addCategory(category: Category) {
    return this.categoriesCollection.add(category);
  }

  removeCategory(id: string) {
    return this.categoriesCollection.doc(id).delete();
  } */

}
