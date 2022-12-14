import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { deleteDoc } from '@firebase/firestore';
import { doc, getFirestore } from 'firebase/firestore';
import * as firebase from 'firebase/firestore';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

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
  public count: number | undefined;
  show = false;
  public message = "";
  public search_result: Array<essentialOil> = [];
  public storage: Array<essentialOil> = [];


  @Output() editInfo = new EventEmitter<any>();

  /*public result2: essentialOil = {
    product: this.product,
    description: this.description,
    benefits: this.benefits,
    uses: this.uses
  };*/

  columnsToDisplay = ['product', 'description', 'uses', 'benefits', 'icon'];

  public myData: Array<essentialOil> = [];
  public dataSource: any;


  constructor(private db: AngularFirestore) { //Created with help from: https://bobbyhadz.com/blog/typescript-get-enum-values-as-array
    this.db.collection<essentialOil>('/Essential_Oils', ref => ref.orderBy('product')).valueChanges().subscribe(result => { //This is reading from the database.
      if (result) {
        this.myData = [];
        this.storage = [];
        result.forEach(item => {
          this.myData.push(item as essentialOil);
          this.storage.push(item as essentialOil);
        })

        this.dataSource = new MatTableDataSource(this.myData);
      }
    });

  }

  @ViewChild(MatSort, { static: true }) sort: MatSort | undefined;

  sortData() {
    this.dataSource.sort = this.sort;
  }


  saveDb() {
    this.db.collection('/Essential_Oils').add(this.newOil);
    this.name = "";
    this.description = "";
  }

  addNew() {
    console.log("Button Press is working");
    this.show = true;
    this.product = '';
    this.description = '';
    this.uses = '';
    this.benefits = '';
  }

  editRow(row: essentialOil) {
    this.show = true;
    console.log("Edit Button works");
    this.product = row.product;
    this.description = row.description;
    this.uses = row.uses;
    this.benefits = row.benefits;
  }

  deleteRow(row: essentialOil) {
    console.log(row);
    const db = getFirestore();
    const docRef = doc(db, "Essential_Oils", row.product);
    deleteDoc(docRef);
    // console.log(row);
    this.product = '';
    this.description = '';
    this.uses = '';
    this.benefits = '';
  }

  gotResult(result: any) {
    this.newOil = result;
    if (this.newOil?.product === "") {
      window.alert("Please Enter a Product Name");
      return;
    }

    if (this.product === '') {
      this.db.collection('/Essential_Oils').doc(this.newOil?.product).set(this.newOil);
    } else if (this.newOil?.product !== this.product) {
      const db = getFirestore();
      const docRef = doc(db, "Essential_Oils", this.product);
      deleteDoc(docRef);
      this.db.collection('/Essential_Oils').doc(this.newOil?.product).set(this.newOil);
    } else {
      this.db.collection('/Essential_Oils').doc(this.newOil?.product).set(this.newOil);
    };
  }

  gotBoolean(result: any) {
    this.show = result;
  }

  search() { //Inspiration for this function comes from:https://stackoverflow.com/questions/13964155/get-javascript-object-from-array-of-objects-by-value-of-property
    this.search_result = [];
    this.storage.forEach(obj => {
      if (obj.product.includes(this.message)) { //Help for this line is from:https://stackoverflow.com/questions/1789945/how-to-check-whether-a-string-contains-a-substring-in-javascript
        this.search_result.push(obj as essentialOil)
      };
    })
    this.dataSource = this.search_result;
  }

  //Reset function to restore the page after a search.
  reset() {
    this.dataSource = this.storage;
    this.message = "";
  }
}
