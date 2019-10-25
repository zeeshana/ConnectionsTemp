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
    this.dbService.getPeople().subscribe( result => {   
      this.people = result;
      this.random = [1, 2, 3];
     }); 
    
  }

  ionViewDidEnter() {
  
   
  }
}
