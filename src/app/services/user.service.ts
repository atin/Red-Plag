import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private login_url = 'http://127.0.0.1:8000/signin/';
  private signup_url = 'http://127.0.0.1:8000/signup/';

  public login(user: User) {
    return this.http.post(this.login_url, JSON.stringify(user))
  };
  public signup(user: User) {
    return this.http.post(this.signup_url, JSON.stringify(user));
  }
  constructor(private http: HttpClient) {}
}
