import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IStudent } from '@core/models/IStudent';
import { IUser } from '@core/models/IUser';
import { CreateUserService } from '@modules/create-user/services/create-user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnDestroy{

 forma!: FormGroup;
 errorSubmit: any [] = [];

 constructor(
  private router: Router,
  private formBuilder: FormBuilder,
  private createUserService: CreateUserService
 ) {
  this.crearFormulario();
 }

 ngOnDestroy(): void {
  console.log("Componente destruido"); // ngOnDestroy is not triggering
}

 crearFormulario(): void {
  this.forma = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    lastname: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.pattern(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i)]],
  });
 }

 createUser() {
  if(this.forma.valid) {
    this.createUserService.createUser(this.forma.value as IStudent).subscribe();
    this.router.navigateByUrl('/users');
    this.forma.reset();
    return;
  }

  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'No puedes crear un usuario sin completar los campos requeridos'
  });
 }
 get nameNoValido(): boolean {
  //* no cumple con la expresion regular y ademas a sido tocado
  return this.forma.get('name')!.invalid && this.forma.get('name')!.touched;
 }

 get lastnameNoValido(): boolean {
  //* no cumple con la expresion regular y ademas a sido tocado
  return this.forma.get('email')!.invalid && this.forma.get('email')!.touched;
 }

 get emailNoValido(): boolean {
  //* no cumple con la expresion regular y ademas a sido tocado
  return this.forma.get('email')!.invalid && this.forma.get('email')!.touched;
 }



}
