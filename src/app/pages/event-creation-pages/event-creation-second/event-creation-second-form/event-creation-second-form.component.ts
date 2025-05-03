import {Component, OnInit} from '@angular/core';
import {UsersListComponent} from '../../../../components/users-list/users-list.component';
import {User} from '../../../../../architecture/model/User';
import {FormService} from '../../../../services/form.service';
import {UsersSearchInputComponent} from '../../../../components/users-search-input/users-search-input.component';

@Component({
  selector: 'app-event-creation-second-form',
  standalone: true,
  imports: [UsersListComponent, UsersSearchInputComponent],
  templateUrl: './event-creation-second-form.component.html',
  styleUrl: './event-creation-second-form.component.css'
})
export class EventCreationSecondFormComponent implements OnInit {
  protected members: User[] = [];
  private formData: FormService | null = null;


  constructor(private formService: FormService) {}

  ngOnInit() {
    this.formData = this.formService.get('newEvent');
    this.members = this.formData?.getOrDefault('members', '');
  }

  addMember(member: User) {
    this.members.push(member);
    this.formService.put('members', this.members);
  }

  saveFormData(){
    this.formData?.put('members', this.members);
    this.formData?.update();
    this.formService.update();
  }
}
