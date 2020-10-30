import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { ErrorMessages } from '../models/errors';
import { mustMatch } from '../helpers/custom.validator';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.scss']
})
export class RegComponent implements OnInit {

  hide_pass = true;
  hide_confirm = true;

  signup_form = this.fb.group({
    firstName: ['a', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
    lastName: ['a', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
    email: ['daffas@a.co', [Validators.required, Validators.email]],
    password: ['some@valU1', [Validators.required, Validators.pattern("^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$")]],
    confirm_pass: ['some@valU1'],
  }, {
    updateOn: 'submit',
    validators: mustMatch('password', 'confirm_pass'),
  });

  errors: ErrorMessages = {};

  getErrorMessages() {
    let fn = this.signup_form.get('firstName');
    let ln = this.signup_form.get('lastName');
    let email = this.signup_form.get('email');
    let pass = this.signup_form.get('password');
    let confirm_pass = this.signup_form.get('confirm_pass');

    this.errors = {};

    fn.hasError('required') ? this.errors['fn'] = 'Enter first name' : '';
    fn.hasError('pattern') ? this.errors['fn'] = 'Not a valid name' : '';
    ln.hasError('required') ? this.errors['ln'] = 'Enter last name' : '';
    ln.hasError('pattern') ? this.errors['ln'] = 'Not a valid name' : '';
    email.hasError('required') ? this.errors['email'] = 'Enter email id' : '';
    email.hasError('email') ? this.errors['email'] = 'Not a valid email' : '';
    pass.hasError('required') ? this.errors['pass'] = 'Enter a password' : '';
    pass.hasError('pattern') ? this.errors['pass'] = 'Not a valid password': '';
    confirm_pass.hasError('mustMatch') ? this.errors['confirm_pass'] = 'Confirm your password': '';
  }

  signup() {
    this.getErrorMessages();
    if(Object.keys(this.errors).length){
      return;
    }

    let userData = this.signup_form.value;
    delete userData.confirm_pass;
    userData = userData as User;
    this.user.signup(userData).subscribe( out => console.log(out));
  }
  constructor(private fb: FormBuilder, private user: UserService) {}
  ngOnInit(): void {}
}
