import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from "./components/header/header.component";
import {ProfileComponent} from './components/profile/profile.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, ProfileComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'join_up';
}
