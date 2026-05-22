import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "../../components/navbar/navbar";
import { FooterComponent } from "../../components/footer/footer";

@Component({
  selector: 'app-layout-principal',
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './layout-principal.html',
  styleUrl: './layout-principal.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutPrincipal {}
