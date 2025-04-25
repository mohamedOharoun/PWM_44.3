import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TagItemComponent} from '../../../../components/tag/tag.component';
import {NgForOf} from '@angular/common';
import {FormService} from '../../../../services/form.service';

@Component({
  selector: 'app-event-creation-third-form',
  standalone: true,
  templateUrl: './event-creation-third-form.component.html',
  imports: [TagItemComponent, NgForOf],
  styleUrls: ['./event-creation-third-form.component.css']
})
export class EventCreationThirdFormComponent implements OnInit {
  eventForm!: FormGroup;

  @ViewChild('tagInput', {static: false}) tagInput!: ElementRef;

  constructor(private fb: FormBuilder, private formService: FormService) {}

  ngOnInit(): void {
    const description = this.formService.get('description') || '';
    const tags = this.formService.get('tags') || [];

    this.eventForm = this.fb.group({
      description: [description, Validators.required],
      tags: [tags, Validators.required]
    });
  }

  addTag(tag: string): void {
    tag = tag.trim();

    if (!tag) return;

    const currentTags: string[] = this.eventForm.get('tags')?.value || [];

    if (currentTags.includes(tag)) return;

    const newTags = [...currentTags, tag];
    this.eventForm.get('tags')?.setValue(newTags);

    this.tagInput.nativeElement.value = '';
    this.formService.put('tags', newTags);
  }

  removeTag(index: number): void {
    const currentTags: string[] = this.eventForm.get('tags')?.value || [];
    currentTags.splice(index, 1);
    this.eventForm.get('tags')?.setValue([...currentTags]);
    this.formService.put('tags', [...currentTags]);
  }

  get tags(): string[] {
    return this.eventForm.get('tags')?.value || [];
  }

  get description(): string {
    return this.eventForm.get('description')?.value;
  }

  saveFormData() {
    this.formService.put('description', this.description);
    this.formService.put('tags', this.tags);
    this.formService.update();
  }
}
