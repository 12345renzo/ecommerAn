import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { LucideEye, LucideEyeOff } from '@lucide/angular';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Usuario } from '../../../service/usuario/usuario';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [LucideEyeOff, LucideEye, RouterLink, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  typoDatos = signal<string>('password');
  operacionesAuth = inject(Usuario);
  private router = inject(Router);
  private toastr = inject(ToastrService);
  profileForm = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  cambiarTypoDatos() {
    this.typoDatos.update((prev) => (prev === 'text' ? 'password' : 'text'));
  }

  async handleSubmit() {
    if (this.profileForm.invalid) {
      return;
    }
    const { email, password } = this.profileForm.getRawValue();
    const loginOk = await this.operacionesAuth.login(email, password);
    if (loginOk) {
      this.toastr.success('Usuario Correcto', 'Éxito');
      this.router.navigate(['/']);
    } else {
      this.toastr.error('Usuario o contraseña incorrectos', 'Error');
    }
  }
}
