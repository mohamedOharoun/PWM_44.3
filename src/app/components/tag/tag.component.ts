import { Component, Input, Output, EventEmitter } from '@angular/core';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-tag-item',
  templateUrl: './tag.component.html',
  imports: [
    NgOptimizedImage
  ],
  styleUrls: ['./tag.component.css']
})
export class TagItemComponent {
  @Input() tag!: string;
  @Input() index!: number;
  @Output() remove = new EventEmitter<number>();

  onRemove() {
    this.remove.emit(this.index);
  }
}
