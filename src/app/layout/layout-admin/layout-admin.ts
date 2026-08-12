import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarAdmin } from "../../components/navbar-admin/navbar-admin";

@Component({
  imports: [RouterOutlet, NavbarAdmin],
  templateUrl: './layout-admin.html',
  styleUrl: './layout-admin.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutAdmin {}
