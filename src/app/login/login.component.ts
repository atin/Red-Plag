import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ErrorMessages } from '../models/errors';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

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
    username: ['', [Validators.required, Validators.pattern(this.username_regex)]],
    password: ['', [Validators.required, Validators.pattern(this.pass_regex)]],
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

  login() {
    this.getErrorMessages();
    if(Object.keys(this.errors).length == 0){
      let userData = this.login_form.value as User;
      console.log(userData);
      // this.userService.login(userData).subscribe()
    }
  }
  constructor(private fb: FormBuilder, private userService: UserService) {}
  ngOnInit(): void {}
}
