import { Component, OnInit } from '@angular/core';
import { Parent } from 'src/app/models/parent';
import { ParentService } from "../../services/parent.service";
import swal from "sweetalert2";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-user-managment',
  templateUrl: './user-managment.component.html',
  styleUrls: ['./user-managment.component.css']
})
export class UserManagmentComponent implements OnInit {

  public adminForm: FormGroup;
  public parents = false;
  public admins = false;
  public parent: Parent;
  public parentList: Array<any>;
  public adminList: Array<any>;

  constructor( private parentService: ParentService, private fb: FormBuilder, private adminService: AdminService) {
    this.adminForm = fb.group({
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      phone: ['', [Validators.required]],
    })
  }

  ngOnInit() {

    this.getUserParents();
    this.getUserAdmins();
  }


  getUserParents() {
    this.parentService.getParents().subscribe((res: any) => {
      this.parentList = res.message;
    });
  }

  getUserAdmins() {
    this.parentService.getAdmins().subscribe((res: any) => {
      this.adminList = res.message;
    });
  }

  showParents() {
    this.parents = true;
    this.admins = false;
  }

  showAdmins() {
    this.admins = true;
    this.parents = false;
  }

  createAdmin() {
    let admin = this.adminForm.value
    this.adminService.createAdmin(admin)
    .subscribe(data => {
      console.log(data);
      admin === data;
      swal.fire('Administrador Registrado exitosamente', '', 'success')
    }, e => {
      console.log(e);
      swal.fire('Hubo un problema al el administrador', '', 'error')
    })
  }
}
