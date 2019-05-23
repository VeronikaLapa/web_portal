import { Component, OnInit } from '@angular/core';
import {User} from '../user';
import {UserService} from '../user-service.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[];

  login: string;
  email: string;
  name: string;


  constructor(private userService: UserService) {
    this.login = '';
    this.name = '';
    this.email = '';
  }

  ngOnInit() {
    this.findall();
  }
  findall() {
    this.userService.findAll().subscribe(data => {
      this.users = data;
    });
  }
  onSubmit() {
    this.userService.findAllFiltered(this.login, this.name, this.email).subscribe(
      data => this.users = data
    );
  }
}
