import { Component } from '@angular/core';

@Component({
  selector: 'app-manage-merchandise',
  standalone: true,
  templateUrl: './manage-merchandise.component.html',
  styleUrls: ['./manage-merchandise.component.scss']
})
export class ManageMerchandiseComponent {
  merchandiseList = [
    { id: 1, name: 'Produto A', active: true },
    { id: 2, name: 'Produto B', active: false },
  ];

  addMerchandise() {
  }

  editMerchandise(id: number) {
  }

  toggleActiveStatus(id: number) {
    const merchandise = this.merchandiseList.find(m => m.id === id);
    if (merchandise) {
      merchandise.active = !merchandise.active;
    }
  }

  deleteMerchandise(id: number) {
    this.merchandiseList = this.merchandiseList.filter(m => m.id !== id);
  }
}