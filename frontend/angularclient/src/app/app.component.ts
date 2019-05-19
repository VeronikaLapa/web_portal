import { Component } from '@angular/core';
import { UserService } from './user-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string
  login: string
  constructor(private userService: UserService) {
    this.title = 'Portal demo';
    this.login = '';
  }
  public get isLogIn(): boolean {
    return this.userService.logIn;
  }
  public logout() {
    this.userService.logout();
  }
}
