import { Component, OnInit } from '@angular/core';
import {User} from '../user';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../user-service.service';

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
    this.userService.save(this.user).subscribe(result => { this.error = ''; },
        error => this.error = error.error.message);
  }
}
