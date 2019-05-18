import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {User} from './user';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class UserService {

  private usersUrl: string;

  constructor(private http: HttpClient) {
    this.usersUrl = 'http://localhost:8080/api';
  }

  public findAll(id: string): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl + '/user/all', {params: new HttpParams().set('id', id)});
  }

  public save(user: User) {
    return this.http.post<User>(this.usersUrl + '/user', user);
  }

  public login(login: string, password: string): Observable<User> {
    return this.http.get<User>(this.usersUrl + '/user/in', {
      params: new HttpParams().set('login', login).set('password', password)
    });
  }

}
