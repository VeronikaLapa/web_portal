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
  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) {
    this.error = '';
    this.login = '';
    this.password = '';
  }

  onSubmit() {
    this.userService.login(this.login, this.password).subscribe(res => localStorage.setItem('token', res.id));
  }
  gotoUserList() {
    this.router.navigate(['api/user/all']);
  }

}
