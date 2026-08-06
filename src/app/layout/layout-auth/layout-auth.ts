import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-layout-auth',
  imports: [RouterOutlet],
  templateUrl: './layout-auth.html',
  styleUrl: './layout-auth.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutAuth {
  private router = inject(Router);
  activo = signal<string>(this.router.url);

  constructor() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe((event: NavigationEnd) => {
        this.activo.set(event.urlAfterRedirects);
      });
  }
}
