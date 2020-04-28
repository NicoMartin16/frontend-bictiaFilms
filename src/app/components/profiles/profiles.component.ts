import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Child } from 'src/app/models/child';
import { ParentService } from '../../services/parent.service';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit {

  public profiles: Array<Child>

  constructor(
    private service: AuthService,
    public parentService: ParentService
  ) {
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
    const users = this.service.parseJwt(localStorage.getItem('token'));
    this.parentService.getChild(users.id).subscribe((res: any) => {
      const childs = []
      res.message.map(element => {
        childs.push(element);
      })

      this.profiles = childs
    });
  }

   // this.profiles = [
    //   {
    //     id: 'id1',
    //     name: 'profile 1',
    //     favFilms: [],
    //   },
    //   {
    //     id: 'id2',
    //     name: 'Profile 2',
    //     favFilms: [],
    //   },
    //   {
    //     id: 'id3',
    //     name: 'Profile 3',
    //     favFilms: [],
    //   }
    // ]

}


