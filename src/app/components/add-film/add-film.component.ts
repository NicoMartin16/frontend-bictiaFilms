import { Component, OnInit } from "@angular/core";
import { Film } from "../../models/film";
import { Form } from "@angular/forms";
import { FilmService } from "../../services/film.service";


interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}


@Component({
    selector: "app-add-film",
    templateUrl: "./add-film.component.html",
    styleUrls: ["./add-film.component.css"],
})
export class AddFilmComponent implements OnInit {
    public film: Film;
    public photoSelected: string | ArrayBuffer;
    public photofile: File;
    public filmList
    public loading = true;

    constructor(
        private service: FilmService
    ) {
        this.film = new Film();
    }

    ngOnInit() {
        this.service.getSong().subscribe((res: any) => {
            if (res.statusCode !== 201) {
                this.filmList.push('No hay canciones');
            } else {
                this.filmList = res.message;
                for (const i of this.filmList) {
                    const randomName = i.name.split('')[0];
                    i.collapse = `${randomName + new Date().getMilliseconds()}`;
                    this.loading = false;
                }
            }
        });
    }

    createFilm() {
    }

    onPhotoSelected(event: HtmlInputEvent): void {
        if (event.target.files && event.target.files[0]) {
        this.photofile = <File>event.target.files[0];
        // Previsualizacion de la imagen
        const reader = new FileReader();
        reader.onload = (e) => (this.photoSelected = reader.result);
        reader.readAsDataURL(this.photofile);
        }
    }
}
