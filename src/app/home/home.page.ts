import { Component } from '@angular/core';
import { People, DBService, Skill } from '../services/db.service';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  skills: Skill = {id: 'react-native', name: 'React Native'}; 

  people: People[]; 
  constructor(private dbService: DBService) { 

  }

  ngOnInit() {
    this.dbService.getPeople().subscribe(res => {
      this.people = res;
    });
    this.addAll();
  }


  addAll() {
    //this.skills.forEach( (element) => {
      this.dbService.addSkill(this.skills)
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
    //});
  }
  /* remove(category) {
    this.categoryService.removeCategory(category.id);
  } */

  

}
