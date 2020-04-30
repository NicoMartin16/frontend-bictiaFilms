import { Component, OnInit, Input, Output } from "@angular/core";
import { AuthService } from '../../services/auth/auth.service';
import { ParentService } from '../../services/parent.service';
import { Child } from 'src/app/models/child';

@Component({
  selector: "navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit {

  constructor(
    public authService: AuthService,
    public parentService: ParentService
  ) {}

  ngOnInit() {
  }

  logOut() {
    localStorage.setItem('token', '');
    localStorage.setItem('child', '');
    this.authService.activeNav = false;
  }

}
