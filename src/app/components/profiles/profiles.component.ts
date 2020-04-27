import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit {

  profiles: any[]

  constructor() { 
    this.getProfiles()
  }

  ngOnInit() {
  }

  goToId(id: string) {
    console.log(id)
  }

  getImg() {
    let route = 'assets/img/profiles/'
    let i = Math.floor(Math.random() * 8) + 1
    return route + i + '.jpg'
  }

  getProfiles() {
    this.profiles = [
      {
        id: 'id1',
        name: 'profile 1',
        favFilms: [],
      },
      {
        id: 'id2',
        name: 'Profile 2',
        favFilms: [],
      },
      {
        id: 'id3',
        name: 'Profile 3',
        favFilms: [],
      }
    ]
  }

}
