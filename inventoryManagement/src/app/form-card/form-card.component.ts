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
  @Input() productCount: number | undefined;
  show: boolean = false;

  @Output() newOil = new EventEmitter<any>();
  @Output() showForm = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {

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
