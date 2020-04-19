import { Component, OnInit } from "@angular/core";

@Component({
    selector: "navbar",
    templateUrl: "./navbar.component.html",
    styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit {
    public logged = null;
    public admin = true;
    public user = false;

    constructor() {
        this.logged = localStorage.getItem('user');
    }

    ngOnInit() { }

    validateRole() {
        if (this.logged.user === 'admin') {
            return this.admin = true;
        }
    }

}
