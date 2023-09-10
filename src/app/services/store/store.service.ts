import { Injectable } from '@angular/core';
import { Store } from 'src/app/interfaces/store.interface';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private _state: Store ; 

  constructor() {
    this._state ={
      username:'',
      password:'',
      role:''
    }
   }

  getState() { 
    return this._state; 
  } 
  setState(data: Store) { 
    this._state = data; 
  } 

  resetStore(){
    this.setState({username:'',password:'',role:''});
  }
}
