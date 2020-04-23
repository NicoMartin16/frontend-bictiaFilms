import { Component, OnInit } from "@angular/core";
import { Film } from "../../models/film";
import { Form } from "@angular/forms";
import { FilmService } from "../../services/film.service";
import swal from "sweetalert2";


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
  public filmList;
  public loading = true;

  constructor(private filmService: FilmService) {
    this.film = new Film();
  }

  ngOnInit() {
    this.getFilms();
  }

  createFilm() {
    const data = new FormData();
    data.append("image", this.photofile, this.photofile.name);
    data.append("name", this.film.name);
    data.append("date", this.film.date);
    data.append("url", this.film.url);
    data.append("sinopsis", this.film.sinopsis);
    // const image = this.setupFile(this.photofile);
    this.filmService.createFilm(data).subscribe((res: any) => {
      if (res.statusCode === 201) {
        swal.fire({
          title: "Pelicula creada",
          text: `La pelicula ha sido creada correctamente`,
          icon: "success",
        });
        return this.getFilms();
      } else {
        swal.fire({
          title: "Alhgo ha salido mal",
          text: `Ups compruebe los datos y vuelva a intentar por favor`,
          icon: "error",
        });
      }
    });
  }

  getFilms() {
    this.filmService.getFilms().subscribe((res: any) => {
      if (!res) {
        console.log("error");
      } else {
        this.filmList = res;
        for (const i of this.filmList) {
          const randomName = i.name.split("")[0];
          i.collapse = `${randomName + Math.random()}`;
          this.loading = false;
        }
      }
    });
  }

  onPhotoSelected(event: HtmlInputEvent): void {
    if (event.target.files && event.target.files[0]) {
      this.photofile = event.target.files[0] as File;
      // Previsualizacion de la imagen
      const reader = new FileReader();
      reader.onload = (e) => (this.photoSelected = reader.result);
      reader.readAsDataURL(this.photofile);
    }
  }
}
