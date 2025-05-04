import {Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {EventCardProfileComponent} from './event-card-profile/event-card-profile.component';
import {ActivatedRoute, Router} from "@angular/router";
import {Auth, user} from "@angular/fire/auth";
import {ServiceFactory} from "../../services/service-factory.service";
import {FirebaseEventService} from "../../io/services/FirebaseEventService";
import {FirebaseUserService} from '../../io/services/FirebaseUserService';
import {Event} from "../../../architecture/model/Event";
import {User} from '../../../architecture/model/User';
import {NgClass} from '@angular/common';
import {EventService} from '../../../architecture/io/services/EventService';

@Component({
  selector: 'app-profile',
  imports: [
    FormsModule, EventCardProfileComponent, NgClass
  ],
  templateUrl: './profile-page-user.component.html',
  styleUrl: './profile-page-user.component.css'
})

export class ProfilePageUserComponent {
  private serviceFactory = inject(ServiceFactory);
  private userService = this.serviceFactory.get('user') as FirebaseUserService;
  private auth = inject(Auth);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  profileUserId = '';
  isOwnProfile = false;
  editIcon = 'icons/edit_icon.svg'

  userData: User = {
    id: '',
    name: '',
    username: '',
    email: '',
    description: '',
    image: ''
  };

  userEvents: Event[] = [];
  sharedEvents: Event[] = [];

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const username = params.get('username');

      if (username) {
        this.userService.getUserByUsername(username).subscribe(userData => {
          if (userData && userData.id) {
            this.profileUserId = userData.id;
            this.userData = userData;

            user(this.auth).subscribe(currentUser => {
              if (currentUser) {
                this.isOwnProfile = currentUser.uid === this.profileUserId;
              }
            });

            const eventService = this.serviceFactory.get('event') as EventService;
            eventService.createdEventsOf(this.userData?.id!).subscribe(events => {
              this.userEvents = events;
            });

            eventService.joinedEventsOf(this.userData?.id!).subscribe(events => {
              this.sharedEvents = events;
            });

          }
        });
      }
    });
  }

  isReadOnly = true;

  canToggle(): boolean {
    if (this.isReadOnly) return true;
    return this.userData.username.trim() !== '' && this.userData.email.includes('@');
  }

  toggleReadOnly() {
    this.isReadOnly = !this.isReadOnly;
    if (this.isReadOnly) {
      const currentUsername = this.route.snapshot.paramMap.get('username');
      const newUsername = this.userData.username.trim();

      if (newUsername === '' || !this.userData.email.includes('@')) {
        alert('You must introduce a valid username and an email with "@"');
        this.isReadOnly = false;
        return;
      }

      console.log('Saving image: ', this.userData.image);

      this.userService.updateUser(this.userData)
        .then(() => {
          console.log('Updated user');
          if (newUsername !== currentUsername) {
            this.router.navigate(['/profile', newUsername]);
          }
        })
        .catch((err) => console.log(err));
    }

    if (this.isOwnProfile) {
      this.editIcon = this.editIcon === 'icons/edit_icon.svg' ? 'icons/check_icon.svg' : 'icons/edit_icon.svg';
    }
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
    this.userData.image = value;
  }
}
