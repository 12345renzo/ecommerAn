import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LucideCrown, LucideHouse, LucideLogOut } from '@lucide/angular';
import { Usuario } from '../../service/usuario/usuario';

@Component({
  selector: 'app-navbar-admin',
  imports: [RouterLink, LucideCrown, LucideHouse, LucideLogOut],
  templateUrl: './navbar-admin.html',
  styleUrl: './navbar-admin.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarAdmin {
  datosUsuario = inject(Usuario);
  private router = inject(Router);

  avatarUrl = computed(() => {
    const user = this.datosUsuario.useri()?.user;
    const seed = user?.id ?? user?.email ?? 'usuario';
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
    }
    const genero = hash % 2 === 0 ? 'women' : 'men';
    const indice = hash % 100;
    return `https://randomuser.me/api/portraits/${genero}/${indice}.jpg`;
  });

  async cerrarSesion() {
    await this.datosUsuario.logout();
    this.router.navigate(['/auth/login']);
  }
}
