import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormService } from '../services/form.service';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  customerForm: FormGroup;
  patterns;
  constructor(
    private _formBuilder: FormBuilder,
    private _formService: FormService
  ) { }

  ngOnInit(): void {
    this.initiForm();
  }

  initiForm() {
    this.customerForm = this._formBuilder.group({
      name: ['', this._formService.defaultNameValidator],
      service_delivery: ['',],
      service_take_away: ['',],
      service_book: ['',],
      service_table: ['',],
      service_room: ['',],
      number_of_branches: ['', Validators.required],
    });
  }

  getAllPatters() {
    this.patterns = this._formService.getAllPatterns();
  }

  getErrors(fieldName: string) {
    return this._formService.getError(fieldName, this.customerForm);
  }

}
