import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { ErrorMessages } from '../interfaces';
import { mustMatch } from '../custom.validator';
@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.scss']
})
export class RegComponent implements OnInit {
  // regex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[&#$@_|~`])$/;

  hide_pass = true;
  hide_confirm = true;

  signup_form = this.fb.group({
    firstname: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
    lastname: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
    email: ['', [Validators.required, Validators.email]],
    pass: ['', [Validators.required, Validators.pattern("^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$")]],
    confirm_pass: [''],
  }, {
    updateOn: 'submit',
    validators: mustMatch('pass', 'confirm_pass'),
  });

  errors: ErrorMessages = {};

  getErrorMessages() {
    let fn = this.signup_form.get('firstname');
    let ln = this.signup_form.get('lastname');
    let email = this.signup_form.get('email');
    let pass = this.signup_form.get('pass');
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
    console.log(this.errors)
  }

  signup() {
    this.getErrorMessages();
  }
  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {}
}
