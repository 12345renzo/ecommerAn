import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from "@angular/router";
import { LucideEye, LucideEyeOff } from '@lucide/angular';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink, LucideEyeOff, LucideEye],
  templateUrl: './register.html',
  styleUrl: './register.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  typoDatos = signal<string>('password');
  profileRegisterForm = new FormGroup({
    fullName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  cambiarTypoDatos() {
    this.typoDatos.update((prev) => (prev === 'text' ? 'password' : 'text'));
  }

  handleSubmit() {
    console.log(this.profileRegisterForm.value.fullName, this.profileRegisterForm.value.email, this.profileRegisterForm.value.password);
  }
}
