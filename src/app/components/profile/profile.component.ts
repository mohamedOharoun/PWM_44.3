import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-profile',
  imports: [
    FormsModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})

export class ProfileComponent {
  userData = {
    fullName: 'Pepe Herrera',
    username: 'pepeherrera60',
    email: 'pepeherrera60@hotmail.com',
    description: 'Qué pasó amigo? Pepe te desea buenos días.',
    profileImage: '../../../public/icons/userprofile_icon.svg'
  };

  userEvents = {
    title: 'User events',
    events: []
  };

  sharedEvents = {
    title: 'Shared events',
    events: []
  };

  handleFileInput(event: Event): void {
    const element = event.target as HTMLInputElement;
    if (element.files && element.files.length > 0) {
      const file = element.files[0];

      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          this.userData.profileImage = e.target.result as string;
        }
      };
      reader.readAsDataURL(file);
    }
  }
}
