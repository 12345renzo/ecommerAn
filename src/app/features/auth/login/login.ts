import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { LucideEye, LucideEyeOff } from '@lucide/angular';
import { RouterLink } from "@angular/router";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [LucideEyeOff, LucideEye, RouterLink, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  typoDatos = signal<string>('password');
  profileForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  cambiarTypoDatos() {
    this.typoDatos.update((prev) => (prev === 'text' ? 'password' : 'text'));
  }

  handleSubmit() {
    console.log(this.profileForm.value.email, this.profileForm.value.password);
  }
}
