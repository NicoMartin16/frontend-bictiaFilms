import { Component, OnInit } from "@angular/core";
import { FilmService } from "../../services/film.service";
import { Film } from "../../models/film";
import { ChildService } from '../../services/child.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
    public films: Film[];
    constructor(
        private _filmService: FilmService,
        private _childService: ChildService,
        private router: Router) {}

    ngOnInit() {
        this.getFilms();
    }

    getFilms() {
        this._filmService.getFilms().subscribe((res: any) => {
            this.films = res;
            console.log(this.films);
        });
    }

    addFav(idFilm){
        let idChild = localStorage.getItem('child');
        this._childService.addFav(idChild, idFilm).subscribe(
            res => {
                swal.fire({
                    title: 'Pelicula favorita agregada',
                    text: `La pelicula ha sido agregada a favoritos correctamente`,
                    icon: 'success'
                });
            }
        )
    }

    viewFilm(id){
        this.router.navigate(['/film', id]);
    }
}
