import { Component, OnInit } from "@angular/core";

@Component({
    selector: "navbar",
    templateUrl: "./navbar.component.html",
    styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit {
    public logged = null;
    public admin = false;
    public user = false;

    constructor() {
        this.logged = this.parseJwt(localStorage.getItem('token'));
    }

    ngOnInit() {
        this.validateRole();
    }

    validateRole() {
        console.log(this.logged)
        if (this.logged.rol === 'ROL_ADMIN') {
            return this.admin = true;
        }
    }

    // Decodificar el token
    parseJwt(token: any) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    }

    logOut() {
        localStorage.setItem('token', '');
    }

}
