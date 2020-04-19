import { Component, OnInit } from "@angular/core";
import { Film } from "../../models/film";
import { Form } from "@angular/forms";
import { FilmService } from "../../services/film.service";

@Component({
    selector: "app-add-film",
    templateUrl: "./add-film.component.html",
    styleUrls: ["./add-film.component.css"],
})
export class AddFilmComponent implements OnInit {
    public film: Film;

    constructor() {
        this.film = new Film();
    }

    ngOnInit() {}

    createFilm() {
    }
}
