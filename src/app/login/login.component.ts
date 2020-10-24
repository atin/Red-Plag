import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  login_form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    pass: ['', Validators.required],
  }, { updateOn: 'submit' });

  hide = true;
  errors: string[];

  getErrorMessages() {
    let email = this.login_form.get('email');
    let pass = this.login_form.get('pass');
    this.errors = [];
    email.hasError('required') ? this.errors.push('Email cannot be empty.') : '';
    email.hasError('email') ? this.errors.push('Not a valid email') : '';
    pass.hasError('required') ? this.errors.push('Password cannot be empty.') : '';
  }

  login() {
    this.getErrorMessages();
  }
  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {}
}
