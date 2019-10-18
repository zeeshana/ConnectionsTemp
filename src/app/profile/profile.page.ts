import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { DBService, People } from '../services/db.service';
import { AddskillPage } from '../modals/addskill/addskill.page';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  private user: any;
  constructor(private authService: AuthService, private dbService: DBService, private modalController: ModalController) {

  }

  ngOnInit() {
    
    /* console.log(currentUser);*/
    this.authService.getUser().subscribe( user => {
      this.dbService.getPersonByQuery('uid', user.uid).subscribe(response => {
        const res = response;
        this.user = res[0];
      });

    });
  }

  async presentAddSkillModal() {
    console.log(this.user);
    const modal = await this.modalController.create({
      component: AddskillPage
    });
    return await modal.present();
  }

}
