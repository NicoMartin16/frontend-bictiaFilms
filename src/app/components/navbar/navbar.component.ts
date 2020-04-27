import { Component, OnInit, Input, Output } from "@angular/core";
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: "navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit {
  public logged = null;
  public admin = false;
  public user = false;

  constructor(public authService: AuthService, ) {
    this.logged = this.authService.parseJwt(localStorage.getItem('token'));
  }

  ngOnInit() {
    this.authService.validateRole(this.logged.rol) ?
                                  this.admin = true
                                  : this.user = true;

    console.log('insted')
  }

  logOut() {
    localStorage.setItem('token', '');
    this.authService.activeNav = false;
  }

}
