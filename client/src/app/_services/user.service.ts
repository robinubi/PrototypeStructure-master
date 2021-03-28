import { Injectable } from '@angular/core';
import {Http, RequestOptions, Response, Headers} from '@angular/http';
import {User} from '../_models/user';
import 'rxjs/add/operator/map';
import {AppConfig} from '../app.config';

@Injectable()
export class UserService {

  constructor(private http: Http, private config: AppConfig) { }

  getAll() {
    return this.http.get(this.config.apiUrl + '/users', this.jwt()).map((response: Response) => response.json());
  }

  getById(_id: string) {
    return this.http.get(this.config.apiUrl + '/users/' + _id, this.jwt()).map((response: Response) => response.json());
  }

  create(user: User) {
    return this.http.post(this.config.apiUrl + '/users/register', user, this.jwt());
  }

  update(user: User) {
    return this.http.put(this.config.apiUrl + '/users/' + user._id, user, this.jwt());
  }

  delete(_id: string) {
    return this.http.delete(this.config.apiUrl + '/users/' + _id, this.jwt());
  }

  private jwt() {
    //create auth header with jwt token
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      let headers = new Headers({'Authorization':'Bearer ' + currentUser.token});
      return new RequestOptions({headers: headers});
    }
  }

}
