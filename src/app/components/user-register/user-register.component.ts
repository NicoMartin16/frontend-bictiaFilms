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
  
  /**
   * Metodos get para obtener el estado del contro name
   */
  get nameNoValidate() {
    return this.form.get('name').invalid && (this.form.get('name').touched  || this.form.get('name').dirty);
  }

  /**
   * Metodos get para obtener el estado del contro lastNamename
   */
  get lastNameNoValidate() {
    return this.form.get('lastName').invalid && (this.form.get('lastName').touched  || this.form.get('lastName').dirty);
  }

  /**
   * Metodos get para obtener el estado del contro email
   */
  get emailNoValidate() {
    return this.form.get('email').invalid && (this.form.get('email').touched  || this.form.get('email').dirty);
  }

  /**
   * Metodos get para obtener el estado del contro birthDate
   */
  get birthDateNoValidate() {
    return this.form.get('birthDate').invalid && (this.form.get('birthDate').touched  || this.form.get('birthDate').dirty);
  }

  /**
   * Metodos get para obtener el estado del contro phone
   */
  get phoneNoValidate() {
    return this.form.get('phone').invalid && (this.form.get('phone').touched  || this.form.get('phone').dirty);
  }

  /**
   * Metodos get para obtener el estado del contro phone
   */
  get passwordNoValidate() {
    return this.form.get('password').invalid && (this.form.get('password').touched  || this.form.get('password').dirty);
  }

  /**
   * Metodos get para obtener el estado del contro password
   */
  get cardNumberNoValidate() {
    return this.form.get('password').invalid && (this.form.get('cardNumber').touched  || this.form.get('cardNumber').dirty);
  }

  /**
   * Metodos get para obtener el estado del contro cardHolder
   */
  get cardHolderNoValidate() {
    return this.form.get('cardHolder').invalid && (this.form.get('cardHolder').touched  || this.form.get('cardHolder').dirty);
  }

  /**
   * Metodos get para obtener el estado del contro expDate
   */
  get expDateNoValidate() {
    return this.form.get('expDate').invalid && (this.form.get('expDate').touched  || this.form.get('expDate').dirty);
  }


  buildForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      name: ['', [Validators.required, Validators.minLength(2) ]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      password: ['', [Validators.required, Validators.minLength(2)]],
      birthDate: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      cardNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
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
    console.log(this.parent );
    if(this.form.invalid){
      return Object.values(this.form.controls).forEach(control => {
        control.markAsTouched();
      });
    } else {
      this._parentService.createParent(this.parent).subscribe(
        res => {
          console.log(res);
          swal.fire({
            title: 'Cuenta registrada',
            text: `La cuenta ha sido registrada correctamente`,
            icon: 'success'
          });
        }
      );
    }

  }

}
