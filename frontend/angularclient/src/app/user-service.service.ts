import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {User} from './user';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class UserService {

  private usersUrl: string;

  userName: string;
  /*
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.getToken()
  });
  */
  constructor(private http: HttpClient) {
    this.usersUrl = 'http://localhost:8080/api';
  }

  public findAll(): Observable<User[]> {
    return this.http
      .get<User[]>(this.usersUrl + '/user/all', {headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.getToken()
        }});
  }

  public findAllFiltered(login: string, name: string, email: string): Observable<User[]> {
    return this.http
      .get<User[]>(this.usersUrl + '/user/all/filtered', {headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.getToken()
        }, params: new HttpParams().set('login', login).set('name', name).set('email', email)});
  }
  public save(user: User) {
    return this.http.post<User>(this.usersUrl + '/user', user);
  }

  public  update(user: User) {
    return this.http.post<User>(this.usersUrl + '/user/update', user, {headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.getToken()
      }});
  }
  public login(login: string, password: string) {
    return this.http.get(this.usersUrl + '/jwt', {
      params: new HttpParams().set('login', login).set('password', password)
    });
  }
  public getToken() {
    return localStorage.getItem('token');
  }
  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
  }

  public get logIn(): boolean {
    return (localStorage.getItem('token') !== null);
  }



}
