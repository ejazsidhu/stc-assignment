import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslateHelperService {

  constructor(private translateService: TranslateService) {
    this.changeLangage('ar');
  }
  
  changeLangage(lang: string) {
  this.translateService.setDefaultLang(lang);
  this.translateService.use(lang);
}
}
