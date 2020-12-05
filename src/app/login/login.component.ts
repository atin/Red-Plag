import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ErrorMessages } from '../models/errors';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  username_regex = "^(?=.{3,30}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$";
  pass_regex = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$";
  hide = true;

  login_form = this.fb.group({
    username: ['abcdef', [Validators.required, Validators.pattern(this.username_regex)]],
    password: ['A@123abcd', [Validators.required, Validators.pattern(this.pass_regex)]],
  }, { updateOn: 'submit' });

  errors: ErrorMessages = {};

  getErrorMessages() {
    let username = this.login_form.get('username');
    let pass = this.login_form.get('password');

    this.errors = {};

    username.hasError('required') ? this.errors['username'] = 'Enter username' : '';
    username.hasError('pattern') ? this.errors['username'] = 'Not a valid username' : '';
    pass.hasError('required') ? this.errors['pass'] = 'Enter a password' : '';
    pass.hasError('pattern') ? this.errors['pass'] = 'Not a valid password': '';
  }

  openSnackBar(message: string, action: string) {
    let loginSnackBar = this._snackBar.open(message, action, {
      duration: 2000,
    });
    loginSnackBar.onAction().subscribe(() => {
      if (action == "Create a new account") {
        this.router.navigate(['/signup']);
      } else if (action == "Go to home page") {
        this.router.navigate(['']);
      }
    });
  }

  login() {
    this.getErrorMessages();
    if(Object.keys(this.errors).length == 0){
      let userData = this.login_form.value as User;
      console.log(userData);
      this.userService.login(userData).subscribe( login_success => {
        console.log(login_success);
        if (login_success) {
          this.openSnackBar("Login successful.", "Go to home page")
        } else {
          this.openSnackBar("Username/password doesn't match.", "Create a new account")
        }
      });
    }
  }
  constructor(private fb: FormBuilder, private userService: UserService, private router: Router, private _snackBar: MatSnackBar) {}
  ngOnInit(): void {}
}
