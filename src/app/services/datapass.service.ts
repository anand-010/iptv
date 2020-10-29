import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatapassService {
  set link(value) {
    this._link = value;
  }
  get link() {
    return this._link;
  }
  private _link;
  constructor() { }

}
