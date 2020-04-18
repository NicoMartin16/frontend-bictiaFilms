import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  form: FormGroup;

  constructor( private formBuilder: FormBuilder) {
    this.buildForm();
  }

  ngOnInit() {
  }

  buildForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required]],
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      password: ['', [Validators.required]],
      passConfirm: ['', [Validators.required]],
      cardNumber: ['', [Validators.required]],
      cardHolder: ['', [Validators.required]],
      expDate: ['', [Validators.required]],
    })
  }

  register() {
    console.log(this.form.value)
  }

}
