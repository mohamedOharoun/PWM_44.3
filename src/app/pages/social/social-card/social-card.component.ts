import { Component } from '@angular/core';
import {SocialCard} from "../../../../model/socialCard";

@Component({
  selector: 'app-social-card',
  imports: [],
  templateUrl: './social-card.component.html',
  standalone: true,
  styleUrl: './social-card.component.css'
})
export class SocialCardComponent {
  protected socialCard!: SocialCard;

}
