import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hide = true;
  login_form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    pass: [''],
  });
  getErrorMessage() {
    let email = this.login_form.get('email');
    if (email.hasError('required')) {
      return 'You must enter a value';
    }

    return email.hasError('email') ? 'Not a valid email' : '';
  }
  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {}
}
