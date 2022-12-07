import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-card',
  templateUrl: './form-card.component.html',
  styleUrls: ['./form-card.component.scss']
})
export class FormCardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  confirm() {
    console.log("Confirm Button Works");
  }

  cancel() {
    console.log("Cancel Button Works");
  }

}
