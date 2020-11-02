import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private login_url = '';
  private signup_url = 'http://127.0.0.1:8000/user/';

  public login(user: User) {};
  public signup(user: User) {
    return this.http.post<User>(this.signup_url, JSON.stringify(user));
  }
  constructor(private http: HttpClient) {}
}
