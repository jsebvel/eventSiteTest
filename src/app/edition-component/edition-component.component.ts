import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/userService/user.service';
import { FormService } from '../services/formService/form.service';
import swal from 'sweetalert2'
import { Router } from '@angular/router';
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
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this.getCustomerList();
  }
  /**
   * @description get the customer according actual user
   */
  getCustomerList() {
    this._userService.getCustomers().subscribe(customers => {
      this.customerList = customers;
      if (this.customerList.length < 1) {
        this.redirectWhenNotUserCustomers();
      }
    });
  }

  /**
   * @description redirect if userId does not exist.
   */
  redirectWhenNotUserCustomers() {
    swal.fire({
      icon: 'warning',
      text: 'En este momento, no tienes restaurantes asociados'
    }).then(data => {
      if(data.isConfirmed) {
        this._router.navigate(['create']);
      }
    })
  }
}
