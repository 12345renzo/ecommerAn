import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LucideEye, LucideEyeOff } from '@lucide/angular';
import { Usuario } from '../../../service/usuario/usuario';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink, LucideEyeOff, LucideEye],
  templateUrl: './register.html',
  styleUrl: './register.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  typoDatos = signal<string>('password');
  operacionesAuth = inject(Usuario);
  private router = inject(Router);
  private toastr = inject(ToastrService);
  profileRegisterForm = new FormGroup({
    fullName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  cambiarTypoDatos() {
    this.typoDatos.update((prev) => (prev === 'text' ? 'password' : 'text'));
  }

  async handleSubmit() {
    if (this.profileRegisterForm.invalid) {
      return;
    }
    const { fullName, email, password } = this.profileRegisterForm.getRawValue();
    const registerOk = await this.operacionesAuth.register(fullName, email, password);
    if (registerOk) {
      this.toastr.success('Usuario Creado', 'Éxito');
      this.router.navigate(['/']);
    } else {
      this.toastr.error('No se pudo crear el usuario', 'Error');
    }
  }
}
