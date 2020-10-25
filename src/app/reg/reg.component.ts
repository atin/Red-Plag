import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { ErrorMessages } from '../interfaces';

@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.scss']
})
export class RegComponent implements OnInit {
  signup_form = this.fb.group({
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    pass: ['', Validators.required],
    confirm_pass: [''],
  }, { updateOn: 'submit' });

  hide = true;
  errors: ErrorMessages = {};

  getErrorMessages() {
    let fn = this.signup_form.get('firstname');
    let ln = this.signup_form.get('lastname');
    let email = this.signup_form.get('email');
    let pass = this.signup_form.get('pass');
    let confirm_pass = this.signup_form.get('confirm_pass');

    this.errors = {};

    fn.hasError('required') ? this.errors['fn'] = 'Enter first name' : '';
    ln.hasError('required') ? this.errors['ln'] = 'Enter last name' : '';
    email.hasError('required') ? this.errors['email'] = 'Enter email id' : '';
    email.hasError('email') ? this.errors['email'] = 'Not a valid email' : '';
    pass.hasError('required') ? this.errors['pass'] = 'Enter a password' : '';
    confirm_pass.value != pass.value ? this.errors['confirm_pass'] = 'Does not match': '';
  }

  signup() {
    this.getErrorMessages();
  }
  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {}
}
