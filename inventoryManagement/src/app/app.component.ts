import { Component } from '@angular/core';

interface essentialOil {
  product: string;
  description: string;
  uses: string;
  benefits: string;
  count: Number;
}

// For testing
const peppermint: essentialOil = {
  product: "Peppermint",
  description: "smells nice",
  uses: "headaches",
  benefits: "smells good",
  count: 2
}

// For testing
const lavender: essentialOil = {
  product: "Lavender",
  description: "Comes from lavender plant",
  uses: "sleep",
  benefits: "promotes relaxation",
  count: 3
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'inventoryManagement';
  myData = [peppermint, lavender];
  columnsToDisplay = ['count', 'product', 'description', 'uses', 'benefits', 'icon']

  addNew() {
    console.log("Button Press is working");
  }

  editRow() {
    console.log("Edit Button works");
  }

  deleteRow() {
    console.log("Delete button works");
  }
}
