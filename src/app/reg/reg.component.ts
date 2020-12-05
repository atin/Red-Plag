import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ErrorMessages } from '../models/errors';
import { mustMatch, not_unique } from '../helpers/custom.validator';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.scss']
})
export class RegComponent implements OnInit {
  username_regex = "^(?=.{3,30}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$";
  pass_regex = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$";
  hide_pass = true;
  hide_confirm = true;

  signup_form = this.fb.group({
    first_name: ['a', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
    last_name: ['a', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
    username: ['abcdef', [Validators.required, Validators.pattern(this.username_regex)]],
    password: ['A@123abcd', [Validators.required, Validators.pattern(this.pass_regex)]],
    confirm_pass: ['A@123abcd'],
  }, {
    updateOn: 'submit',
    validators: [mustMatch('password', 'confirm_pass'), not_unique('username')],
  });

  errors: ErrorMessages = {};

  getErrorMessages() {
    let fn = this.signup_form.get('first_name');
    let ln = this.signup_form.get('last_name');
    let username = this.signup_form.get('username');
    let pass = this.signup_form.get('password');
    let confirm_pass = this.signup_form.get('confirm_pass');

    this.errors = {};

    fn.hasError('required') ? this.errors['fn'] = 'Enter first name' : '';
    fn.hasError('pattern') ? this.errors['fn'] = 'Not a valid name' : '';
    ln.hasError('required') ? this.errors['ln'] = 'Enter last name' : '';
    ln.hasError('pattern') ? this.errors['ln'] = 'Not a valid name' : '';
    username.hasError('required') ? this.errors['username'] = 'Enter username' : '';
    username.hasError('pattern') ? this.errors['username'] = 'Not a valid username' : '';
    pass.hasError('required') ? this.errors['pass'] = 'Enter a password' : '';
    pass.hasError('pattern') ? this.errors['pass'] = 'Not a valid password': '';
    confirm_pass.hasError('mustMatch') ? this.errors['confirm_pass'] = "Passwords doesn't match": '';
  }

  openSnackBar(message: string, action: string) {
    let regSnackBar = this._snackBar.open(message, action, {
      duration: 2000,
    });
    if (action == "Login now") {
      regSnackBar.onAction().subscribe(() => {
        this.router.navigate(['/login']);
      });
    }
  }

  signup() {
    this.getErrorMessages();
    
    if(Object.keys(this.errors).length == 0){
      let userData = this.signup_form.value;
      delete userData.confirm_pass;
      userData = userData as User;
      let username = this.signup_form.get('username');
      this.userService.signup(userData).subscribe( (response) => {
        console.log(response);
        if (response.status == 201) {
          this.openSnackBar("User created. Going to login page.", "Login now");
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 3000);
        }
      },
      (error) => {
        console.error(error)
        username.setErrors({not_unique: true});
        this.errors['username'] = 'Username already taken';
      });
    }
  }
  constructor(private fb: FormBuilder, private userService: UserService, private router: Router, private _snackBar: MatSnackBar) {}
  ngOnInit(): void {}
}
