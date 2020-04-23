import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilmService } from '../../services/film.service';
import { Film } from '../../models/film';

@Component({
  selector: 'app-view-film',
  templateUrl: './view-film.component.html',
  styleUrls: ['./view-film.component.css']
})
export class ViewFilmComponent implements OnInit {

  public film: Film;

  video: string = 'https://www.youtube.com/embed/x0fKGPy0KTk'
  constructor(private route: ActivatedRoute, private _filmService: FilmService) { 
    this.film = new Film();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      let id = param.get('idFilm');
      this._filmService.getFilmById(id).subscribe(
        (res: any) => {
          this.film = res.message;
          console.log(this.film[0].url);
        }
      );
    });
  }

}
