import { Component } from '@angular/core';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrl: './parent.component.css',
})
export class ParentComponent {
  parentInputData: string = 'Hello I am the data from parent component';
  data: any[] = [
    { id: 1, item: 'moto g 34' },
    { id: 2, item: 'moto g 85' },
  ];
  childData: any;
  handleChildEvent(newItem: string) {
    this.data = [...this.data, { id: this.data.length, item: newItem }];
  }

  deleteItem(index: number): void {
    console.log(index);
    this.data = this.data.filter((_, i) => i !== index);
  }
}
