import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TagItemComponent } from '../../../../components/tag/tag.component';
import { NgForOf } from '@angular/common';
import { FormService } from '../../../../services/form.service';
import { FormsModule } from '@angular/forms';
import {InputComponent} from '../../../../components/input/input.component';

@Component({
  selector: 'app-event-creation-third-form',
  standalone: true,
  templateUrl: './event-creation-third-form.component.html',
  imports: [TagItemComponent, NgForOf, FormsModule, InputComponent],
  styleUrls: ['./event-creation-third-form.component.css']
})
export class EventCreationThirdFormComponent implements OnInit {
  protected description = '';
  protected tags: string[] = [];
  private formData: FormService | null = null;

  @ViewChild('tagInput', { static: false }) tagInput!: ElementRef;

  constructor(private formService: FormService) {}

  ngOnInit(): void {
    this.formData = this.formService.get('newEvent');
    this.description = this.formData?.getOrDefault('description', '');
    this.tags = this.formData?.getOrDefault('tags', []);
  }

  addTag(tag: string): void {
    tag = tag.trim();
    if (!tag || this.tags.includes(tag)) return;

    this.tags = [...this.tags, tag];
    this.tagInput.nativeElement.value = '';
    this.formService.put('tags', this.tags);
  }

  removeTag(index: number): void {
    this.tags.splice(index, 1);
    this.tags = [...this.tags]; // ensure change detection
    this.formData?.put('tags', this.tags);
  }

  saveFormData(): void {
    this.formData?.put('description', this.description);
    this.formData?.put('tags', this.tags);
    this.formService.update();
  }

  protected setDescription(value: string): void {
    this.description = value;
  }

}
