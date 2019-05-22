import { Component, OnInit } from '@angular/core';
import {User} from '../user';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../user-service.service';

@Component({
  selector: 'app-user-update-form',
  templateUrl: './user-update-form.component.html',
  styleUrls: ['./user-update-form.component.css']
})
export class UserUpdateFormComponent {

  user: User;
  error: string;
  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) {
    this.user = new User();
    this.error = '';
  }

  onSubmit() {
    this.userService.update(this.user).subscribe(result => {localStorage.setItem('name', result.login); this.error = ''; },
      error => this.error = error.error.message);
  }
}
