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
  public formEmail: FormGroup;
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
    this.formEmail = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]]
    })
  }

  getUser() {
    this.user = this.authService.parseJwt(localStorage.getItem('token'));
    this.isParent = this.user.rol === 'ROL_PARENT'? true: false
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

  verifyPW() {

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
    this.parentService.updatePW(this.user.id,this.parent).subscribe( (res: any) => {
      if (res) {
        swal.fire({
          title: "Dato actualizado",
          text: `Contraseña actualizada correctamente`,
          icon: "success",
        });
      }
    },
    (error: any) => {
      if (error) {
        swal.fire({
          title: 'Error al actualizar contraseña',
          icon: 'error'
        })
      }
    }
    );;
  }

  updateEmail() {
    this.parent.email = this.formEmail.controls.email.value
    this.parentService.updateEmail(this.user.id,this.parent).subscribe((res: any) => {
      if (res) {
        swal.fire({
          title: "Dato actualizado",
          text: `Correo actualizado correctamente`,
          icon: "success",
        });
        this.user.email = res.message.email
      }
    },
    (error: any) => {
      console.log(error)
      if (error) {
        swal.fire({
          title: 'Error al actualizar correo',
          icon: 'error'
        })
      }
    });;
  }

  async deleteChild(event) {
    this.parentService.deleteChild(this.user.id,event.target.value).subscribe(async (res: any) => {
      if (res) {
        await this.getChilds();
        swal.fire({
          title: "Eliminación exitosa",
          text: `Hijo eliminado`,
          icon: "success",
        });
      }
    },
    (error: any) => {
      if (error) {
        swal.fire({
          title: "Error al eliminar hijo",
          text: `Lo sentimos. Intente de nuevo`,
          icon: "error",
        });
      }
    });
  }
}
