import {Component, OnInit} from '@angular/core';
import {UsersListComponent} from '../../../../components/users-list/users-list.component';
import {User} from '../../../../model/User';
import {FormService} from '../../../../services/form.service';

@Component({
  selector: 'app-event-creation-second-form',
  standalone: true,
  imports: [UsersListComponent],
  templateUrl: './event-creation-second-form.component.html',
  styleUrl: './event-creation-second-form.component.css'
})
export class EventCreationSecondFormComponent implements OnInit {
  protected members: User[] = [];

  constructor(private formService: FormService) {}

  ngOnInit() {
    const storedMembers = this.formService.get('members');
    this.members = storedMembers ? storedMembers : [];
  }

  addMember(member: User) {
    this.members.push(member);
    this.formService.put('members', this.members);
  }
}
