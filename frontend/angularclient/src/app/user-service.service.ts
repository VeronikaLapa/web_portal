import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {User} from './user';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class UserService {

  private usersUrl: string;

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
    // return this.http.get<User[]>(this.usersUrl + '/user/all',{headers: this.headers} );
    return this.http
      .get<User[]>(this.usersUrl + '/user/all', {headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.getToken()
        }});
  }

  public save(user: User) {
    return this.http.post<User>(this.usersUrl + '/user', user);
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
  }

  public get logIn(): boolean {
    return (localStorage.getItem('token') !== null);
  }

}
