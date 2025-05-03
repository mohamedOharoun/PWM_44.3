import {Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import { EventCardProfileComponent } from './event-card-profile/event-card-profile.component';
import {ActivatedRoute} from "@angular/router";
import {Auth, user} from "@angular/fire/auth";
import {ServiceFactory} from "../../services/service-factory.service";
import {FirebaseEventService} from "../../io/services/FirebaseEventService";
import {Event} from "../../../architecture/model/Event";

@Component({
  selector: 'app-profile',
  imports: [
    FormsModule, EventCardProfileComponent
  ],
  templateUrl: './profile-page-user.component.html',
  styleUrl: './profile-page-user.component.css'
})

export class ProfilePageUserComponent {
  private serviceFactory = inject(ServiceFactory);
  private eventService = this.serviceFactory.get('event') as FirebaseEventService;
  private auth = inject(Auth);
  private route = inject(ActivatedRoute);

  profileUserId = '';
  isOwnProfile = false;
  editIcon = 'icons/edit_icon.svg'

  userData = {
    fullName: 'Example user',
    username: 'example_user',
    email: 'user@example.com',
    description: 'Hi! I´m an example user.'
  };

  userEvents = {
    title: 'User events',
    events: [] as Event[]
  };

  sharedEvents = {
    title: 'Shared events',
    events: [] as Event[]
  };

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.profileUserId = id;

        user(this.auth).subscribe(currentUser => {
          if (currentUser) {
            this.isOwnProfile = currentUser.uid === this.profileUserId;
            this.loadEvents(this.profileUserId);
          }
        });
      }
    });
  }

  private loadEvents(userId: string): void {
    this.eventService.createdEventsOf(userId).subscribe(events => {
      this.userEvents.events = events;
    });

    if (!this.isOwnProfile) {
      this.eventService.joinedEventsOf(userId).subscribe(events => {
        this.sharedEvents.events = events;
      });
    }
  }

  isReadOnly = true;
  toggleReadOnly() {
    this.isReadOnly = !this.isReadOnly;
    this.editIcon = this.editIcon === 'icons/edit_icon.svg' ? 'icons/check_icon.svg' : 'icons/edit_icon.svg';
  }

  protected image: string = 'icons/userprofile_icon.svg';
  protected onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  protected onDrop(event: DragEvent) {
    event.preventDefault();

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.handleFile(files[0]);
    }
  }

  protected handleFile(file: File) {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.setImageValue(e.target?.result);
      };
      reader.readAsDataURL(file);
    }
  }

  protected triggerFileInput() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  protected onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.handleFile(file);
    }
  }

  private setImageValue(value: string) {
    this.image = value;
  }
}
