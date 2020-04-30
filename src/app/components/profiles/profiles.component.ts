import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Child } from 'src/app/models/child';
import { ParentService } from '../../services/parent.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit {

  public profiles: Array<Child>

  constructor(
    private service: AuthService,
    public parentService: ParentService,
    public router: Router
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
        element.img = this.getImg()
        childs.push(element);
      })

      this.profiles = childs
    });
  }

  setProfile(event) {
    const currentChild = event.path[1].value
    localStorage.setItem('child', `${currentChild}`)
    this.router.navigate(['home'])
  }
}


