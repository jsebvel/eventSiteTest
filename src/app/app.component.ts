import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserService } from './services/userService/user.service';
import { IdState } from './user/userRedux/user.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'eventSiteTest';
  localUserId;
  userId;
  constructor(
    private _userRDX: Store<IdState>,
  ) {
    this._userRDX.select('id').subscribe(userId => {
      this.userId = userId;
    })

  }

}
