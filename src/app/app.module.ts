import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';


// Rutas
import { RouterModule } from "@angular/router";
import { ROUTES } from "./app.routes";

import { AppComponent } from "./app.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { LoginComponent } from "./components/login/login.component";
import { HomeComponent } from "./components/home/home.component";
import { FooterComponent } from "./components/footer/footer.component";
import { ProfilesComponent } from "./components/profiles/profiles.component";
import { AdminFilmsComponent } from "./components/admin-films/admin-films.component";
import { AddFilmComponent } from "./components/add-film/add-film.component";
import { UserRegisterComponent } from "./components/user-register/user-register.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

// Servicios

import { FilmService } from "./services/film.service";
import { AuthService } from "./services/auth/auth.service";
import { UserManagmentComponent } from './components/user-managment/user-managment.component';
import { ViewFilmComponent } from './components/view-film/view-film.component';
import { SafePipe } from './pipes/safe.pipe';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        LoginComponent,
        HomeComponent,
        FooterComponent,
        ProfilesComponent,
        AdminFilmsComponent,
        AddFilmComponent,
        UserRegisterComponent,
        UserManagmentComponent,
        ViewFilmComponent,
        SafePipe
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(ROUTES),
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        FontAwesomeModule
    ],
    providers: [
        FilmService,
        AuthService
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
    constructor(private library: FaIconLibrary){
        library.addIcons(faPlayCircle);
    }
}
