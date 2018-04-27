import { Component, OnInit } from '@angular/core';
import {SettingsService} from "../services/settings/settings.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(private settingsService: SettingsService) { }

  ngOnInit() {
    this.settingsService.backendUrl;
  }

  setBackendUrl(event){
    this.settingsService.setBackendUrl(event.srcElement.value);
  }



}
