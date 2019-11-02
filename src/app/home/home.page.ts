import { Component } from '@angular/core';
import { DBService } from '../services/db.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  people: Array<any> = [];
  random = [];
  // Array is loaded only on resize thats weird.
  

  constructor(public dbService: DBService) {
    // dbService.addPersonDummy();
    
    
  }

  ngOnInit() {
  
  }

  ionViewDidEnter() {
     
    this.dbService.getPeople().then( result => {
      this.people = result;
    }).catch(error =>{console.log('Get people : ' + error)});
    
   
  }
}
