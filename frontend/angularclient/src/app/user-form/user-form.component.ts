import { Component, OnInit } from '@angular/core';
import {User} from '../user';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../user-service.service';
import {AppComponent} from "../app.component";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {

  user: User;
  error: string;
  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) {
    this.user = new User();
    this.error = '';
  }

  onSubmit() {
    this.userService.save(this.user).subscribe(result => {localStorage.setItem('token', result.id); this.error = ''; },
        error => this.error = error.error.message);
  }

  gotoUserList() {
    this.router.navigate(['api/user/all']);
  }
}
