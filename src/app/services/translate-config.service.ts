import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslateConfigService {
 
  constructor(private translateService: TranslateService) { }

  getDefaultLanguage() {
    let language = this.translateService.getBrowserLang();
    this.translateService.setDefaultLang( language );
    return language;
  }

  setLanguage(language) {
    this.translateService.use( language );
  }
}
