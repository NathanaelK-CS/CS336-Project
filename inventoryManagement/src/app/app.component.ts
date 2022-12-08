import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { } from '@angular/core';

interface essentialOil {
  product: string;
  description: string;
  uses: string;
  benefits: string;
}

// For testing
const peppermint: essentialOil = {
  product: "Peppermint",
  description: "smells nice",
  uses: "headaches",
  benefits: "smells good",
}

// For testing
const lavender: essentialOil = {
  product: "Lavender",
  description: "Comes from lavender plant",
  uses: "sleep",
  benefits: "promotes relaxation",
}

/*type FirestoreRec = {
  benefits: string;
  description: string;
  name: string;
  uses: string;
}*/

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'inventoryManagement';
  public product: string = "";
  public description: string = "";
  public benefits: string = "";
  public uses: string = "";
  public name: string = "";

  public result2: essentialOil[] = [];

  /*public result2: essentialOil = {
    product: this.product,
    description: this.description,
    benefits: this.benefits,
    uses: this.uses
  };*/

  columnsToDisplay = ['product', 'description', 'uses', 'benefits'];

  public myData: Array<essentialOil> = [];

  constructor(private db: AngularFirestore) { //Created with help from: https://bobbyhadz.com/blog/typescript-get-enum-values-as-array
    this.db.collection<essentialOil>('/Essential_Oils', ref => ref.orderBy('product')).valueChanges().subscribe(result => { //This is reading from the database.
      if (result) {
        this.myData = [];
        result.forEach(item => {
          this.myData.push(item as essentialOil);
        })
        this.result2 = result;
        console.log("This is the result" + this.result2[0].benefits);//result2 is a FirestoreRec of everything in the database.
      }
    });
  }

  saveDb() {
    let object3 = {
      product: this.product,
      description: this.description,
      benefits: this.benefits,
      uses: this.uses
    }
    this.db.collection('/Essential_Oils').add(object3);
    this.name = "";
    this.description = "";

  }

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
