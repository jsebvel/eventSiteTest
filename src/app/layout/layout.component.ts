import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Customer } from 'src/models/customer';
import { User } from 'src/models/user';
import { UserService } from 'src/services/user.service';
import Swal from 'sweetalert2'
import { IdState } from '../user/userRedux/user.reducer';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  mainForm: FormGroup;
  user: User;
  customer: Customer;
  location: Location;
  userId;

  constructor(
    private _formBuilder: FormBuilder,
    private _userService: UserService,
    private _userRDX: Store<IdState>,
  ) { }

  ngOnInit(): void {
    this.mainForm = this._formBuilder.group({
    });
    this._userRDX.select('id').subscribe(id => {
      this.userId = id
    });

  }

  async createForm() {
    console.log(this.mainForm)
    if (this.mainForm.valid) {
      const userForm = this.mainForm.get('userForm') as FormGroup;
      this.user = userForm.getRawValue();

      const customerForm = this.mainForm.get('customerForm') as FormGroup;
      this.customer = customerForm.getRawValue();

      const locationForm = this.mainForm.get('locationForm') as FormGroup;
      this.location = locationForm.getRawValue();

      await this._userService.createUser(this.user);
      if (this.userId.length > 0) {
        await this._userService.createCustomer(this.customer);
      }
    } else {
      Swal.fire({
        icon: 'warning',
        text: 'Por favor verifica los campos en rojo'
      });
      this.mainForm.markAllAsTouched();
    }
  }

}
