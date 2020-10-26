import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.scss']
})
export class RegComponent implements OnInit {
  regex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[&#$@_|~`])$/;


  signup_form = this.fb.group({
    firstName: ['',[Validators.required,Validators.minLength(3),Validators.pattern('[a-zA-Z ]*')]],
    lastName: ['',[Validators.required,Validators.minLength(3),Validators.pattern('[a-zA-Z ]*')]],
    email: ['',[Validators.required,Validators.email]],
    pass: ['',[Validators.required,Validators.minLength(6),]],
    confirm: ['',[Validators.required,Validators.minLength(6)]]
  } ,{ updateOn: 'submit' });

  hide_pass = true;
  hide_confirm = true;
  errors: string[];

  getErrorMessages() {
    let firstName = this.signup_form.get('firstName');
    let lastName = this.signup_form.get('lastName');
    let email = this.signup_form.get('email');
    let pass = this.signup_form.get('pass');
    let confirm = this.signup_form.get('confirm');
    this.errors = [];

    //First name errors
    firstName.hasError('required') ? this.errors.push('First name cannot be empty.') : '';
    firstName.hasError('minlength')||firstName.hasError('pattern') ? this.errors.push('First name invalid.') : '';

    //Last name errors
    lastName.hasError('required') ? this.errors.push('Last name cannot be empty.') : '';
    lastName.hasError('minlength')||firstName.hasError('pattern') ? this.errors.push('Last name invalid.') : '';

    //Email errors
    email.hasError('required') ? this.errors.push('Email cannot be empty.') : '';
    email.hasError('email') ? this.errors.push('Not a valid email') : '';

    //Password and confirm errors
    pass.hasError('required') ? this.errors.push('Password cannot be empty.') : '';
    if (pass.hasError('pattern') || this.regex.test(pass.value)){
        this.errors.push('Invalid password.');
    }
    else if (confirm.value != pass.value){
        this.errors.push('Confirm password does not match given password.')
        confirm.setErrors({'incorrect':true});
    }
  }

  signup() {
    this.getErrorMessages();
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

}
