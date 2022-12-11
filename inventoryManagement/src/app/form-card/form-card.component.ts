import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


interface essentialOil {
  product: string;
  description: string;
  uses: string;
  benefits: string;
}

@Component({
  selector: 'app-form-card',
  templateUrl: './form-card.component.html',
  styleUrls: ['./form-card.component.scss']
})
export class FormCardComponent implements OnInit {
  public productName: string | undefined;
  public productDesc: string | undefined;
  public productUses: string | undefined;
  public productBenefits: string | undefined;
  show: boolean = false;

  @Output() newOil = new EventEmitter<any>();
  @Output() showForm = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {

  }

  // saveName(result: any) {
  //   console.log(result.target.value);
  //   this.productName = result.target.value;
  // }

  // saveDesc(result: any) {
  //   console.log(result.target.value);
  //   this.productDesc = result.target.value;
  // }

  // saveUses(result: any) {
  //   console.log(result.target.value);
  //   this.productUses = result.target.value;
  // }

  // saveBenefits(result: any) {
  //   console.log(result.target.value);
  //   this.productBenefits = result.target.value;
  // }

  confirm() {
    console.log("Button Works");
    const confirmedOil = {
      product: this.productName,
      description: this.productDesc,
      uses: this.productUses,
      benefits: this.productBenefits
    }
    this.newOil.emit(confirmedOil);
    this.productName = '';
    this.productDesc = '';
    this.productUses = '';
    this.productBenefits = '';
    this.showForm.emit(false);
  }

  cancel() {
    console.log("Button Works");
    this.productName = '';
    this.productDesc = '';
    this.productUses = '';
    this.productBenefits = '';
    this.showForm.emit(false);
  }

}
