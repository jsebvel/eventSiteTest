import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormService } from '../services/formService/form.service';
import { UserService } from '../services/userService/user.service';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  @Input() mainForm;
  @Input() item;
  customerForm: FormGroup;
  patterns;
  constructor(
    private _formBuilder: FormBuilder,
    private _formService: FormService,
    private _userService: UserService,
  ) { }

  ngOnInit(): void {
    if (!this.item) {
      this.initForm();
    } else {
      this.createForm();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(!this.item) {
      if (this.mainForm.status != 'DISABLED' && !this.mainForm.contains('customerForm')) {
        if (!this.patterns) {
          this.getAllPatters();
        }
        this.initForm();
      }

    }
  }

  initForm() {
    this.mainForm.addControl('customerForm', this._formBuilder.group([]));
    this.customerForm = this.mainForm.get('customerForm') as FormGroup;

    this.customerForm.addControl('name', new FormControl('',Validators.compose([Validators.required, Validators.minLength(6)])));
    this.customerForm.addControl('service_delivery', new FormControl('',Validators.compose([])));
    this.customerForm.addControl('service_take_away', new FormControl('',Validators.compose([])));
    this.customerForm.addControl('service_book', new FormControl('',Validators.compose([])));
    this.customerForm.addControl('service_table', new FormControl('',Validators.compose([])));
    this.customerForm.addControl('service_room', new FormControl('',Validators.compose([])));
    this.customerForm.addControl('number_of_branches', new FormControl('',Validators.compose([Validators.required])));
  }

  createForm() {
    this.customerForm = this._formBuilder.group({
      'name': ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      'service_delivery': ['', Validators.compose([])],
      'service_take_away': ['', Validators.compose([])],
      'service_book': ['', Validators.compose([])],
      'service_table': ['', Validators.compose([])],
      'service_room': ['', Validators.compose([])],
      'number_of_branches': ['', Validators.compose([Validators.required])],
    })

    this.putData();
  }

  putData(){
    this.customerForm.get('name').setValue(this.item.name);
    this.customerForm.get('service_delivery').setValue(this.item.service_delivery);
    this.customerForm.get('service_take_away').setValue(this.item.service_take_away);
    this.customerForm.get('service_book').setValue(this.item.service_book);
    this.customerForm.get('service_table').setValue(this.item.service_table);
    this.customerForm.get('service_room').setValue(this.item.service_room);
    this.customerForm.get('number_of_branches').setValue(this.item.number_of_branches);
  }

  getAllPatters() {
    this.patterns = this._formService.getAllPatterns();
  }

  getErrors(fieldName: string) {
    return this._formService.getError(fieldName, this.customerForm);
  }

  updateProduct(item) {
    const newFOrm = this.customerForm.getRawValue();
    this._userService.updateInfo(newFOrm, item.id);
  }
}
