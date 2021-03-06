import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  constructor(
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.redirectWhenRouteNotExists();
  }

  /**
   * @description verify if requested page exists
   * and redirect according to if user is login
   */
  redirectWhenRouteNotExists() {
    const route = sessionStorage.getItem('userId')
      ? 'create'
      : '';
    swal.fire({
      title: 'Paǵina no encontrada',
      text: 'Lo sentimos, no pudimos encontrar esta página'
    }).then(resp => {
      if (resp.isConfirmed) {
        this._router.navigate([route]);
      }
    });
  }

}
