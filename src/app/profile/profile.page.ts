import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { PeopleService, People } from '../services/people.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: People;
  constructor(private authService: AuthService, private peopleService: PeopleService) { 

  }

  ngOnInit() {
    let currentUser = this.authService.getCurrentUser();
    console.log(currentUser.uid);
    this.peopleService.getPersonByQuery('uid', currentUser.uid).subscribe(res => {
      console.log(res[0].name);
    });
  }

}
