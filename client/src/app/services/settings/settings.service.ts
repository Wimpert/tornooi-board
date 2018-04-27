import { Injectable } from '@angular/core';

@Injectable()
export class SettingsService {

  //backendUrl : string = "http://169.254.236.212:3000/";
  backendUrl : string = "http://192.168.0.164:3000/";

  constructor() {}

  setBackendUrl(newValue : string):void {
    this.backendUrl = newValue;
  }

}
