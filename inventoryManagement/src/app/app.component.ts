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
  public value: string = '';
  public key: string = '';
  public obj2: string = '';
  public obj3: string = '';
  public obj4: string = '';
  public obj5: string = '';


  /*public result2: essentialOil = {
    product: this.product,
    description: this.description,
    benefits: this.benefits,
    uses: this.uses
  };*/

  columnsToDisplay = ['product', 'description', 'uses', 'benefits', 'icon'];

  public myData: Array<essentialOil> = [];
  public dataSource: any;

  // Reads in data and stores it in dataSource
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

  // Sort function for the table
  sortData() {
    // We had a bug where the sorting was also sorting by capitalized words.
    // I found a fix here: https://stackoverflow.com/questions/54198687/my-mat-table-is-sorting-by-capitalized-words-how-can-i-fix-this-in-angular
    this.dataSource.sortingDataAccessor = (data: any, sortHeaderId: string): string => {
      if (typeof data[sortHeaderId] === 'string') {
        return data[sortHeaderId].toLocaleLowerCase();
      }

      return data[sortHeaderId];
    };
    this.dataSource.sort = this.sort;
  }

  // Saves New oil to the database
  saveDb() {
    this.db.collection('/Essential_Oils').add(this.newOil);
    this.name = "";
    this.description = "";
  }

  // Function when add new button is pressed
  addNew() {
    console.log("Button Press is working");
    this.show = true;
    this.product = '';
    this.description = '';
    this.uses = '';
    this.benefits = '';
  }

  // Function when edit button is pressed
  editRow(row: essentialOil) {
    this.show = true;
    console.log("Edit Button works");
    this.product = row.product;
    this.description = row.description;
    this.uses = row.uses;
    this.benefits = row.benefits;
  }

  // Function called when delete button is pressed
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

  // Function to set oil in database
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

  // Function called when user performs search operation
  search() { //Inspiration for this function comes from:https://stackoverflow.com/questions/13964155/get-javascript-object-from-array-of-objects-by-value-of-property
    this.search_result = [];
    this.storage.forEach(obj => {
      // Convert everything to lowercase
      this.obj2 = obj.product.toLocaleLowerCase();
      this.obj3 = obj.description.toLocaleLowerCase();
      this.obj4 = obj.benefits.toLocaleLowerCase();
      this.obj5 = obj.uses.toLocaleLowerCase();
      // searching the array for search term
      if (this.obj2.includes(this.message) || obj.product.includes(this.message)) { //Help for this line is from:https://stackoverflow.com/questions/1789945/how-to-check-whether-a-string-contains-a-substring-in-javascript
        this.search_result.push(obj as essentialOil)
      };
      if (this.obj3.includes(this.message) || obj.description.includes(this.message)) {
        this.search_result.push(obj as essentialOil);
      }
      if (this.obj4.includes(this.message) || obj.benefits.includes(this.message)) {
        this.search_result.push(obj as essentialOil);
      }
      if (this.obj5.includes(this.message) || obj.uses.includes(this.message)) {
        this.search_result.push(obj as essentialOil);
      }
      // Help found here: https://www.javascripttutorial.net/array/javascript-remove-duplicates-from-array/
      // Clears duplicates from array and stores new array in the dataSource array to be displayed
      const uniqueOils: essentialOil[] = [];
      this.search_result.forEach((c) => {
        if (!uniqueOils.includes(c)) {
          uniqueOils.push(c);
        }
        this.search_result = uniqueOils;
      });
    })
    this.dataSource = new MatTableDataSource(this.search_result);
  }
}
