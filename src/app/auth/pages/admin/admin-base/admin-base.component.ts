import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from 'src/app/interfaces/store.interface';
import { StoreService } from 'src/app/services/store/store.service';
import { TranslateHelperService } from 'src/app/services/translate/translate-helper.service';

@Component({
  selector: 'app-admin-base',
  templateUrl: './admin-base.component.html',
  styleUrls: ['./admin-base.component.scss'],
  encapsulation: ViewEncapsulation['None']
})
export class AdminBaseComponent {

  _store: Store;
  // languageSelection:string = 'ar';
  // languageList: string[] = ['ar','en'];

  constructor(public langHelper:TranslateHelperService,private router: Router, private store: StoreService) {
    this._store = this.store.getState();
  }

  signOut() {
    this.store.resetStore();
    this._store = this.store.getState();;
    this.router.navigate(['/']);
  }
}
