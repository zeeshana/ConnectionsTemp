import { Component } from '@angular/core';
import { DBService } from '../services/db.service';
import Parse from 'parse';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public people: any[];
  public text: "Zaheer";

  constructor(private dbService: DBService) {
    // dbService.addPersonDummy();
    
  }

  ngOnInit() {
    this.dbService.getPeople().then( result => {
      this.people = result;
     for(let i=0; i<this.people.length; i++) {
        let person = this.people[i];
        console.log( person.attributes.handle );
      }
      console.log(this.people);
    });

  }

  ionViewDidEnter() {
    
  }

}
