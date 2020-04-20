import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Parent } from '../../models/parent';
import { ParentService } from '../../services/parent.service';
import { switchAll } from 'rxjs/operators';
import swal from 'sweetalert2';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  form: FormGroup;
  parent: Parent;

  constructor( 
    private formBuilder: FormBuilder,
    private _parentService: ParentService) {
    this.parent = new Parent();
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
      birthDate: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      cardNumber: ['', [Validators.required]],
      cardHolder: ['', [Validators.required]],
      expDate: ['', [Validators.required]],
    })
  }

  register() {
    this.parent.name = this.form.get('name').value;
    this.parent.lastName = this.form.get('lastName').value;
    this.parent.email = this.form.get('email').value;
    this.parent.birthDate = this.form.get('birthDate').value;
    this.parent.phone = this.form.get('phone').value;
    this.parent.password = this.form.get('password').value;
    this.parent.creditCard = this.form.get('cardNumber').value;

    this._parentService.createParent(this.parent).subscribe(
      res => {
        swal.fire({
          title: 'Cuenta registrada',
          text: `La cuenta ha sido registrada correctamente`,
          icon: 'success'
        });
      }
    )

  }

}
