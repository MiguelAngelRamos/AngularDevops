import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IAuth } from '@core/models/IAuth.interface';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
 forma!: FormGroup;
 mmessageError: String = '';
 usuarioLogeado!: IAuth;

 constructor(
  private router: Router,
  private formBuilder: FormBuilder,
  private authService: AuthService,
  private cookie: CookieService
  ) {
    this.crearFormulario();
 }

 crearFormulario(): void {
  this.forma = this.formBuilder.group({
    email: ['', [Validators.required, Validators.pattern(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i)]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });
 }

 get correoNoValido(): boolean {
  // let email = this.forma.get('email')!.invalid;
  // let touched = this.forma.get('email')!.touched;
  // return email && touched;
  return this.forma.get('email')!.invalid && this.forma.get('email')!.touched;
}

get passNoValido(): boolean {
  return this.forma.get('password')!.invalid && this.forma.get('password')!.touched;
}

 login() {
  if(this.forma.valid) {
    const {email, password } = this.forma.value;

    this.authService.sendCredentials(email, password).subscribe( response => {
      console.log('Session fue iniciada', response); // token impreso
      const { tokenSession, data } = response;
      console.log(response);

      this.cookie.set('token', tokenSession, 4, '/')
      this.router.navigateByUrl('/usuarios');

    })
  }
 }
}
