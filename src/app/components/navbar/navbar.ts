import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideSearch, LucideShoppingCart, LucideUser } from '@lucide/angular';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, LucideUser, LucideShoppingCart, LucideSearch],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {}
