import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-profile',
  imports: [
    FormsModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './profile-page-user.component.html',
  styleUrl: './profile-page-user.component.css'
})

export class ProfilePageUserComponent {
  editIcon = 'icons/edit_icon.svg'
  saveChanges = 'icons/check_icon.svg'

  userData = {
    fullName: 'Example user',
    username: 'example_user',
    email: 'user@example.com',
    description: 'Hi! I´m an example user.'
  };

  userEvents = {
    title: 'User events',
    events: []
  };

  sharedEvents = {
    title: 'Shared events',
    events: []
  };

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
