import {Component, OnInit} from '@angular/core';
import {UsersListComponent} from '../../../../components/users-list/users-list.component';
import {UsersSearchInputComponent} from '../../../../components/users-search-input/users-search-input.component';
import {FormService} from '../../../../services/form.service';
import {ServiceFactory} from '../../../../services/service-factory.service';
import {AuthenticationService} from '../../../../../architecture/io/services/AuthenticationService';

@Component({
  selector: 'app-event-creation-second-form',
  standalone: true,
  imports: [UsersListComponent, UsersSearchInputComponent],
  templateUrl: './event-creation-second-form.component.html',
  styleUrl: './event-creation-second-form.component.css'
})
export class EventCreationSecondFormComponent implements OnInit {
  protected members: string[] = [];
  private formData: FormService | null = null;

  constructor(
    private formService: FormService,
    private serviceFactory: ServiceFactory
  ) {
  }

  ngOnInit() {
    this.formData = this.formService.get('newEvent');
    const existingMembers = [...this.formData?.getOrDefault('members', [])];

    (this.serviceFactory.get('auth') as AuthenticationService).user.subscribe(user => {
      if (user?.id) {
        // Si no estaba ya, lo insertamos al principio
        this.members = existingMembers.includes(user.id)
          ? existingMembers
          : [user.id, ...existingMembers];

        this.formService.put('members', this.members);
      } else {
        this.members = existingMembers;
      }
    });
  }

  addMember(id: string) {
    if (!this.members.includes(id)) {
      this.members.push(id);
      this.formService.put('members', this.members);
    }
  }

  saveFormData() {
    this.formData?.put('members', this.members);
  }

  removeMember(id: string) {
    this.members = this.members.filter(m => m !== id);
    this.formService.put('members', this.members);
  }
}
