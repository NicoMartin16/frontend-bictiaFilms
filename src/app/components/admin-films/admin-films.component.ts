import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-admin-films",
    templateUrl: "./admin-films.component.html",
    styleUrls: ["./admin-films.component.css"],
})
export class AdminFilmsComponent implements OnInit {

    public movies: any;
    public users: any;

    constructor() {}

    ngOnInit() { }


    showMovies() {
        this.movies = true;
        this.users = false;
    }

    showUsers() {
        this.movies = false;
        this.users = true;
    }
}
