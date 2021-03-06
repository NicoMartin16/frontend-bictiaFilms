import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { AdminFilmsComponent } from "./components/admin-films/admin-films.component";
import { ViewFilmComponent } from './components/view-film/view-film.component';
import { ProfilesComponent } from './components/profiles/profiles.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';

export const ROUTES: Routes = [
    { path: '', component: LoginComponent },
    { path: 'registro', component: UserRegisterComponent },
    { path: 'home', component: HomeComponent },
    { path: 'admin', component: AdminFilmsComponent },
    { path: 'film/:idFilm', component: ViewFilmComponent },
    { path: 'profiles', component: ProfilesComponent },
    { path: 'myprofile', component: MyProfileComponent },
    { path: '**', pathMatch: 'full', redirectTo: '' }
];
