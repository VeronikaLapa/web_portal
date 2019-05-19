import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string
  login: string
  constructor() {
    this.title = 'Portal demo';
    this.login = '';
  }

}
