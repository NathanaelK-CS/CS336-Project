import { Component } from '@angular/core';

interface essentialOil {
  product: string;
  description: string;
  uses: string;
  benefits: string;
}

const peppermint: essentialOil = {
  product: "Peppermint",
  description: "smells nice",
  uses: "headaches",
  benefits: "smells good"
}

const lavender: essentialOil = {
  product: "Lavender",
  description: "Comes from lavender plant",
  uses: "sleep",
  benefits: "promotes relaxation"
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'inventoryManagement';
  myData = [peppermint, lavender];
  columnsToDisplay = ['product', 'description', 'uses', 'benefits']

}
