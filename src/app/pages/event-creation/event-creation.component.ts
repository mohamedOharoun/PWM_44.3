import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms'
import {CommonModule} from '@angular/common';
import {GenericButtonComponent} from '../../components/generic-button/generic-button.component';
import {UsersListComponent} from '../../components/users-list/users-list.component';
import {User} from '../../model/User';
import {TagItemComponent} from '../../components/tag/tag.component';

@Component({
  selector: 'app-event-creation',
  templateUrl: './event-creation.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    GenericButtonComponent,
    UsersListComponent,
    TagItemComponent
  ],
  styleUrls: ['./event-creation.component.css']
})
export class EventCreationComponent implements OnInit {
  @ViewChild('tagInput') tagInput!: ElementRef;
  @ViewChild('memberInput') memberInput!: ElementRef;

  protected selectedMembers: User[] = [
    {
      email: "string",
      name: "string",
      username: "string",
      description: "string",
      image: "string",
      friends: [],
      pending: [],
      sentRequests: [],
      blocked: [],
      groups: []
    },
    {
      email: "string",
      name: "string",
      username: "string",
      description: "string",
      image: "string",
      friends: [],
      pending: [],
      sentRequests: [],
      blocked: [],
      groups: []
    },
    {
      email: "string",
      name: "string",
      username: "string",
      description: "string",
      image: "string",
      friends: [],
      pending: [],
      sentRequests: [],
      blocked: [],
      groups: []
    },
    {
      email: "string",
      name: "string",
      username: "string",
      description: "string",
      image: "string",
      friends: [],
      pending: [],
      sentRequests: [],
      blocked: [],
      groups: []
    },
    {
      email: "string",
      name: "string",
      username: "string",
      description: "string",
      image: "string",
      friends: [],
      pending: [],
      sentRequests: [],
      blocked: [],
      groups: []
    }
  ];

  eventForm: FormGroup;
  eventId: string | null = null;
  filteredMembers: User[] = [];
  staticText: any;

  constructor(
    private fb: FormBuilder
  ) {
    this.eventForm = this.fb.group({
      name: ['', Validators.required],
      date: ['', [Validators.required, this.futureDateValidator]],
      price: [0, [Validators.min(0)]],
      isPrivate: [false],
      place: ['', Validators.required],
      description: ['', Validators.required],
      tags: [[]]
    });
  }

  ngOnInit(): void {
    this.staticText = {
      "event-form": {
        "create": {
          "title": "New Event",
          "submit-button": "Create Event"
        },
        "edit": {
          "title": "Modify Event",
          "submit-button": "Save Changes"
        },
        "labels": {
          "name": "Name",
          "date": "Date & Time",
          "place": "Location",
          "cost": "Price",
          "public": "Public",
          "private": "Private",
          "members": "Members",
          "description": "Description",
          "tags": "Tags"
        },
        "placeholders": {
          "members": "Select Members"
        }
      }
    };

  }

  addTag(tag: string): void {
    tag = tag.trim();

    if (!tag) return;
    const currentTags = this.eventForm.get('tags')?.value || [];

    const newTags = [...currentTags, tag];
    this.eventForm.get('tags')?.setValue(newTags);

    this.tagInput.nativeElement.value = "";
  }

  removeTag(index: number): void {
    const currentTags = [...this.eventForm.get('tags')?.value];
    currentTags.splice(index, 1);
    this.eventForm.get('tags')?.setValue(currentTags);
  }

  getErrorMessage(controlName: string): string | null {
    const control = this.eventForm.get(controlName);
    if (control?.touched && control?.invalid) {
      if (control.hasError('required')) {
        return `${this.staticText['event-form']['labels'][controlName]} is required.`;
      }
      if (control.hasError('min')) {
        return `Price cannot be negative.`;
      }
      if (control.hasError('pastDate')) {
        return `The date cannot be in the past.`;
      }
    }
    return null;
  }

  private futureDateValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;

    const selectedDate = new Date(value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return selectedDate < today ? { pastDate: true } : null;
  }
}
