import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  public user: any
  public sonList: Array<string> = []
  public parent: boolean = false

  constructor(public authService : AuthService) { }

  ngOnInit() {
    this.getUser()
  }

  getUser() {
    this.user = this.authService.parseJwt(localStorage.getItem('token'));
    this.parent = this.user.rol === 'ROL_PARENT'? true: false
  }

  updateMail() {
    console.log('entrando')
  }

}
