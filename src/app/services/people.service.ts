import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
}

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  private peopleCollection: AngularFirestoreCollection<People>;
  private people: Observable<People[]>;


  constructor(private db: AngularFirestore) {
    this.peopleCollection = db.collection<People>('people');

    this.people = this.peopleCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );

  }

  getPeople() {
    return this.people;
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
