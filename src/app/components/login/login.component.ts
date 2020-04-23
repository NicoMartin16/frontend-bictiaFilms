import { Component, OnInit } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {
    FormGroup,
    FormBuilder,
    Validators,
    ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { LogUser } from '../../models/LogUser';
import swal from 'sweetalert2';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
    form: FormGroup;
    private user: LogUser

    constructor(
        private formBuilder: FormBuilder,
        private service: AuthService,
        public router: Router
    ) {
        this.buildForm();
        this.user = new LogUser();
    }

    ngOnInit() {}

    buildForm() {
        this.form = this.formBuilder.group({
            email: ['', [Validators.required]],
            password: ['', [Validators.required]],
        });
    }

    login() {
        this.user.email = this.form.controls.email.value;
        this.user.password = this.form.controls.password.value;
        this.service.adminLogin(this.user).subscribe((res: any) => {
            if (res.statusCode === 200) {
                console.log(res);
                swal.fire({
                    title: 'Ingreso exitoso',
                    text: `Será redirigio al panel de control`,
                    icon: 'success'
                });
                localStorage.setItem('token', res.message.token);
                this.router.navigate(['home']);
            }
        }, (error: any) => {
            if (error) {
                swal.fire({
                    title: 'Email o contraseña incrrectos',
                    text: `Compruebe los datos y vuelva a intentar por favor`,
                    icon: 'error'
                });
            }}
        );
    }
}
