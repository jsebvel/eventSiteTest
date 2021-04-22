import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/services/user.service';
import { FormService } from '../services/form.service';

@Component({
  selector: 'app-edition-component',
  templateUrl: './edition-component.component.html',
  styleUrls: ['./edition-component.component.scss']
})
export class EditionComponentComponent implements OnInit {
  customerList;
  constructor(
    private _formService: FormService,
    private _userService: UserService,
  ) { }

  ngOnInit(): void {
    this.getCustomerList();
  }

  getCustomerList() {
   this._userService.getCustomers().valueChanges().subscribe(customers => {
     this.customerList = customers;
     console.log(this.customerList);
   })
  }
}
