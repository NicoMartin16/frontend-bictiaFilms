import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { ParentService } from '../../services/parent.service';
import { Child } from '../../models/child';
import { Parent } from '../../models/parent';
import swal from "sweetalert2";
import { map } from 'rxjs/operators';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  public user: any
  public sonList: Array<string>
  public isParent: boolean = false
  public child: Child;
  public parent: Parent;
  public form: FormGroup;
  public flag: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthService,
    public parentService: ParentService
  ) {}

  ngOnInit() {
    this.getUser();
    this.child = new Child();
    this.getChilds();
    this.parent = new Parent();
    this.buildForm();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(2)]],
      password_ver: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  getUser() {
    this.user = this.authService.parseJwt(localStorage.getItem('token'));
    this.isParent = this.user.rol === 'ROL_PARENT'? true: false
  }

  updateMail() {
    console.log('entrando')
  }

  async createChild() {
    this.child.parent = this.user.id
    this.parentService.createChild(this.child).subscribe(async (res: any) => {
      if (res) {
        await this.getChilds();
        swal.fire({
          title: "Hijo creado",
          text: `Hijo creado correctamente`,
          icon: "success",
        });
      }

    });
    this.sonList = [];
  }

  getChilds() {
    this.parentService.getChild(this.user.id).subscribe((res: any) => {
      const childs = []
      res.message.map(element => {
        childs.push(element);
      })

      this.sonList = childs
    });
  }

  updateProfile() {

  }

  verifyPW(event) {

    const btnUpdate = document.getElementById('btn-update');
    (this.form.controls.password_ver.value === this.form.controls.password.value)
      ? (this.flag = false,
        btnUpdate.classList.remove('btn-secondary'),
        btnUpdate.classList.add('btn-primary'))
      : (this.flag = true,
        btnUpdate.classList.add('btn-secondary'),
        btnUpdate.classList.remove('btn-primary'))
  }

  updatePW() {
    this.parent.password = this.form.controls.password.value
    this.parentService.updateParent(this.user.id,this.parent).subscribe(async (res: any) => {
      if (res) {
        swal.fire({
          title: "Dato actualizado",
          text: `Contraseña actualizada correctamente`,
          icon: "success",
        });
      }
    });;
  }

  // async deleteChild() {
  //   this.parentService.deleteChild(this.child).subscribe(async (res: any) => {
  //     if (res) {
  //       await this.getChilds();
  //       swal.fire({
  //         title: "Hijo creado",
  //         text: `Hijo creado correctamente`,
  //         icon: "success",
  //       });
  //     }
  //   });
  // }
}
