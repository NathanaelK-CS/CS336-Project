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
  @Input() productName: string | undefined;
  @Input() productDesc: string | undefined;
  @Input() productUses: string | undefined;
  @Input() productBenefits: string | undefined;

  @Output() newOil = new EventEmitter<any>();



  constructor() { }

  ngOnInit(): void {

  }

  saveName(result: any) {
    console.log(result.target.value);
    this.productName = result.target.value;
  }

  saveDesc(result: any) {
    console.log(result.target.value);
    this.productDesc = result.target.value;
  }

  saveUses(result: any) {
    console.log(result.target.value);
    this.productUses = result.target.value;
  }

  saveBenefits(result: any) {
    console.log(result.target.value);
    this.productBenefits = result.target.value;
  }

  confirm() {
    console.log("Button Works");
    const confirmedOil = {
      product: this.productName,
      description: this.productDesc,
      uses: this.productUses,
      benefits: this.productBenefits
    }
    this.newOil.emit(confirmedOil);
  }

  cancel() {
    console.log("Button Works");
    this.productName = '';
    this.productDesc = '';
    this.productBenefits = '';
    this.productUses = '';

  }

}
