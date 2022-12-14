import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { } from '@angular/core';
import { deleteDoc } from '@firebase/firestore';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import * as firebase from 'firebase/firestore';

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
  public newOil: essentialOil | undefined;
  show = false;
  public message = "";
  public search_result: Array<essentialOil> = [];
  public storage: Array<essentialOil> = [];

  /*public result2: essentialOil = {
    product: this.product,
    description: this.description,
    benefits: this.benefits,
    uses: this.uses
  };*/

  columnsToDisplay = ['product', 'description', 'uses', 'benefits', 'icon'];

  public myData: Array<essentialOil> = [];

  constructor(private db: AngularFirestore) { //Created with help from: https://bobbyhadz.com/blog/typescript-get-enum-values-as-array
    this.db.collection<essentialOil>('/Essential_Oils', ref => ref.orderBy('product')).valueChanges().subscribe(result => { //This is reading from the database.
      if (result) {
        this.myData = [];
        this.storage = [];
        result.forEach(item => {
          this.myData.push(item as essentialOil);
          this.storage.push(item as essentialOil);
        })
        this.result2 = result;//result2 is a FirestoreRec of everything in the database.
        console.table(this.myData);
      }
    });
  }

  saveDb() {
    this.db.collection('/Essential_Oils').add(this.newOil);
    this.name = "";
    this.description = "";
  }

  addNew() {
    console.log("Button Press is working");
    this.show = true;
  }

  editRow(row: essentialOil) {
    // in-progress
    console.log("Edit Button works");
    const db = getFirestore();
    const docRef = doc(db, "Essential_Oils", row.product);
    this.product = row.product;
    this.description = row.description;
    this.uses = row.uses;
    this.benefits = row.benefits;
  }

  deleteRow(row: essentialOil) {
    console.log("Delete button works");
    const db = getFirestore();
    const docRef = doc(db, "Essential_Oils", row.product);
    deleteDoc(docRef);
    // console.log(row);
  }

  gotResult(result: any) {
    this.newOil = result;
    this.db.collection('/Essential_Oils').doc(this.newOil?.product).set(this.newOil);
  }

  gotBool(result: any) {
    this.show = result;
  }

  search() { //Inspiration for this function comes from:https://stackoverflow.com/questions/13964155/get-javascript-object-from-array-of-objects-by-value-of-property
    this.search_result = [];
    this.storage.forEach(obj => {
      if (obj.product.includes(this.message)) { //Help for this line is from:https://stackoverflow.com/questions/1789945/how-to-check-whether-a-string-contains-a-substring-in-javascript
        this.search_result.push(obj as essentialOil)
      };
    })
    this.myData = this.search_result;
  }

  //Reset function to restore the page after a search.
  reset() {
    this.myData = this.storage;
    this.message = "";
  }
}
