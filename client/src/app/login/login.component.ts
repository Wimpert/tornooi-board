import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  constructor(public userService:  UserService) { }

  ngOnInit() {
  }

  login(): void{
    this.userService.login(this.username, this.password, true);
  }

  logout(): void{
    this.userService.logout();
  }

}
