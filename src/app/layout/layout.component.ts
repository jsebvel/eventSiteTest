import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Customer } from 'src/models/customer';
import { User } from 'src/models/user';
import { UserService } from 'src/app/services/userService/user.service';
import Swal from 'sweetalert2'
import { IdState } from '../user/userRedux/user.reducer';
import { Router } from '@angular/router';
import { authStore } from '../auth/authStore/authStore.reducer';
import { setIsLoading } from '../auth/authStore/authStore.actions';

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
  isLoading = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _userService: UserService,
    private _userRDX: Store<IdState>,
    private _router: Router,
    private _authStore: Store<authStore>
  ) { }

  ngOnInit(): void {
    this.mainForm = this._formBuilder.group({
    });
  }

  /**
   * @description init the reducer object state
   */
  createReducers() {
    this._userRDX.select('id').subscribe(id => {
      this.userId = id
    });

    this._authStore.select('loading').subscribe(loading => {
      this.isLoading = loading;
    })
  }

  /**
   * @description Get the custoer info from main form and send it to create customer.
   */
  async createForm() {
    this._authStore.dispatch(setIsLoading({ loading: true }));
    const customerForm = this.mainForm.get('customerForm') as FormGroup;
    this.customer = customerForm.getRawValue();
    const customerResponse = await this._userService.createCustomer(this.customer);
    this._authStore.dispatch(setIsLoading({ loading: false }));
  }

  logout() {
    this._userService.signOut();
    this._router.navigate(['']);
  }

  goEdit() {
    this._router.navigate(['edition'])
  }

}
