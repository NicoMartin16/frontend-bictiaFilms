import { Component, OnInit } from "@angular/core";
import { FilmService } from "../../services/film.service";
import { Film } from "../../models/film";

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
    public films: Film[];
    constructor(private _filmService: FilmService) {}

    ngOnInit() {
        this.getFilms();
    }

    getFilms() {
        this._filmService.getFilms().subscribe((res: any) => {
            console.log(res);
            this.films = res;
            console.log(this.films);
        });
    }
}
