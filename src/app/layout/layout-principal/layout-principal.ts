import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "../../components/navbar/navbar";

@Component({
  selector: 'app-layout-principal',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './layout-principal.html',
  styleUrl: './layout-principal.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutPrincipal {}
