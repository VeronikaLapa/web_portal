import { Component, OnInit } from '@angular/core';
import {User} from '../user';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../user-service.service';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.css']
})
export class UserLoginFormComponent {

  login: string;
  password: string;
  error: string;
  user: User;
  message: string;
  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) {
    this.error = '';
    this.login = '';
    this.password = '';
    this.message = '';
  }

  onSubmit() {
    this.userService.login(this.login, this.password).subscribe(
      (res: any ) => {localStorage.setItem('token', res.token);
      localStorage.setItem('name', this.login);
      this.error = '';
      this.message = 'Login done'; },
      error => this.error = error.error.message);
  }


}
