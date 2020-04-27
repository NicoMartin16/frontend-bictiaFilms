import { Component, OnInit } from '@angular/core';
import { Parent } from 'src/app/models/parent';
import { ParentService } from "../../services/parent.service";
import swal from "sweetalert2";

@Component({
  selector: 'app-user-managment',
  templateUrl: './user-managment.component.html',
  styleUrls: ['./user-managment.component.css']
})
export class UserManagmentComponent implements OnInit {

  public parents = false;
  public admins = false;
  public parent: Parent;
  public parentList: Array<any>;
  public adminList: Array<any>;

  constructor( private parentService: ParentService ) { }

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
}
