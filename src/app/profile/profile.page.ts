import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { PeopleService, People } from '../services/people.service';
import { AddskillPage } from '../modals/addskill/addskill.page';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  private user: any;
  constructor(private authService: AuthService, private peopleService: PeopleService, private modalController: ModalController) {

  }

  ngOnInit() {
    let currentUser = this.authService.getCurrentUser();
    console.log(currentUser.uid);
    this.peopleService.getPersonByQuery('uid', currentUser.uid).subscribe(res => {
      console.log(res[0].name);
      console.log(res[0].handle);
      this.user = res[0];
    });
  }

  async presentAddSkillModal() {
    const modal = await this.modalController.create({
      component: AddskillPage
    });
    return await modal.present();
  }

}
