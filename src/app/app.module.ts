import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//Rutas
import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';




import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProfilesComponent } from './components/profiles/profiles.component';
import { AdminFilmsComponent } from './components/admin-films/admin-films.component';
import { AddFilmComponent } from './components/add-film/add-film.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';

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
    UserRegisterComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
