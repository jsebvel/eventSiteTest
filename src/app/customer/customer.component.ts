import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormService } from '../services/form.service';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  @Input() mainForm;
  customerForm: FormGroup;
  patterns;
  constructor(
    private _formBuilder: FormBuilder,
    private _formService: FormService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.mainForm.status != 'DISABLED' && !this.mainForm.contains('customerForm')) {
      if (!this.patterns) {
        this.getAllPatters();
      }
      this.initForm();
    }
  }


  initForm() {
    this.mainForm.addControl('customerForm', this._formBuilder.group([]));
    this.customerForm = this.mainForm.get('customerForm') as FormGroup;

    this.customerForm.addControl('name', new FormControl('',Validators.compose(this._formService.defaultNameValidator)))
    this.customerForm.addControl('service_delivery', new FormControl('',Validators.compose([])))
    this.customerForm.addControl('service_take_away', new FormControl('',Validators.compose([])))
    this.customerForm.addControl('service_book', new FormControl('',Validators.compose([])))
    this.customerForm.addControl('service_table', new FormControl('',Validators.compose([])))
    this.customerForm.addControl('service_room', new FormControl('',Validators.compose([])))
    this.customerForm.addControl('number_of_branches', new FormControl('',Validators.compose([Validators.required])))
  }

  getAllPatters() {
    this.patterns = this._formService.getAllPatterns();
  }

  getErrors(fieldName: string) {
    return this._formService.getError(fieldName, this.customerForm);
  }

}
