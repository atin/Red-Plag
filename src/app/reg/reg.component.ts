import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

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
  errors: string[];

  getErrorMessages() {
    let fn = this.signup_form.get('firstname');
    let ln = this.signup_form.get('lastname');
    let email = this.signup_form.get('email');
    let pass = this.signup_form.get('pass');
    this.errors = [];

    fn.hasError('required') ? this.errors.push('First Name cannot be empty.') : '';
    ln.hasError('required') ? this.errors.push('Last Name cannot be empty.') : '';
    email.hasError('required') ? this.errors.push('Email cannot be empty.') : '';
    email.hasError('email') ? this.errors.push('Not a valid email') : '';
    pass.hasError('required') ? this.errors.push('Password cannot be empty.') : '';
  }

  signup() {
    this.getErrorMessages();
  }
  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {}
}
