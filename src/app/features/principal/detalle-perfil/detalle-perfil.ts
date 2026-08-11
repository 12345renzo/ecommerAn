import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  LucideAtSign,
  LucideBadgeCheck,
  LucideCrown,
  LucideIdCard,
  LucideLogOut,
  LucideMail,
  LucideUserRound,
} from '@lucide/angular';
import { Usuario } from '../../../service/usuario/usuario';

@Component({
  selector: 'app-detalle-perfil',
  imports: [
    LucideAtSign,
    LucideBadgeCheck,
    LucideCrown,
    LucideIdCard,
    LucideLogOut,
    LucideMail,
    LucideUserRound,
  ],
  templateUrl: './detalle-perfil.html',
  styleUrl: './detalle-perfil.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetallePerfilComponents {
  datosUsuario = inject(Usuario);
  private router = inject(Router);

  avatarUrl(): string {
    const user = this.datosUsuario.useri()?.user;
    const seed = user?.id ?? user?.email ?? 'usuario';
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
    }
    const genero = hash % 2 === 0 ? 'women' : 'men';
    const indice = hash % 100;
    return `https://randomuser.me/api/portraits/${genero}/${indice}.jpg`;
  }

  async cerrarSesion() {
    await this.datosUsuario.logout();
    this.router.navigate(['/auth/login']);
  }
}
