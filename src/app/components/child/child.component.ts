import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrl: './child.component.css',
})
export class ChildComponent {
  @Input() childInputData = 'testing';
  @Output() newItemEvent = new EventEmitter<string>();
  item: string = '';
  adding() {
    this.newItemEvent.emit(this.item);
    this.item = '';
  }
}
