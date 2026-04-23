import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout-admin',
  imports: [RouterOutlet],
  templateUrl: './layout-admin.html',
  styleUrl: './layout-admin.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutAdmin {}
