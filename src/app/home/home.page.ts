import { Component } from '@angular/core';
import { People, PeopleService } from '../services/people.service';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  people: People[];
  constructor(private peopleService: PeopleService) { 
    console.log('constructor');
  }

  ngOnInit() {
    console.log('nginito');
    this.peopleService.getPeople().subscribe(res => {
      this.people = res;
      console.log(this.people);
    });
    /* this.addAll(); */
  }



  /* remove(category) {
    this.categoryService.removeCategory(category.id);
  } */

}
