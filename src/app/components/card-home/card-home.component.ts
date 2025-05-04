import {Component, Input} from '@angular/core';
import {UserService} from '../../../architecture/io/services/UserService';
import {User} from '../../../architecture/model/User';
import {ServiceFactory} from '../../services/service-factory.service';

@Component({
  selector: 'app-card-home',
  imports: [],
  templateUrl: './card-home.component.html',
  styleUrl: './card-home.component.css'
})
export class CardHomeComponent {
  @Input() userID!: string;

  protected user!: User;

  constructor(
    private serviceFactory: ServiceFactory
  ) {
  }
  ngOnInit() {
    (this.serviceFactory.get('user') as UserService).userWith(this.userID).subscribe(res => this.user = res);
  }
}
