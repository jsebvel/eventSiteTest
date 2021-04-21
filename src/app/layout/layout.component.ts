import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Customer } from 'src/models/customer';
import { User } from 'src/models/user';
import { UserService } from 'src/services/user.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  mainForm: FormGroup;
  user:User;
  customer:Customer;
  location: Location;

  constructor(
    private _formBuilder: FormBuilder,
    private _userService: UserService,
  ) { }

  ngOnInit(): void {
    this.mainForm = this._formBuilder.group({
    });

  }

  createForm() {
    console.log(this.mainForm)
    this._userService.createCustomer();
    if (this.mainForm.valid) {
      const userForm = this.mainForm.get('userForm') as FormGroup;
      this.user = userForm.getRawValue();

      const customerForm = this.mainForm.get('customerForm') as FormGroup;
      this.customer = customerForm.getRawValue();

      const locationForm = this.mainForm.get('locationForm') as FormGroup;
      this.location = locationForm.getRawValue();
    } else {
      Swal.fire({
        icon: 'warning',
        text: 'Por favor verifica los campos en rojo'
      });
      this.mainForm.markAllAsTouched();
    }
  }

}
