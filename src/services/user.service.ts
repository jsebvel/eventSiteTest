import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { updateUserId } from 'src/app/user/userRedux/user.actions';
import { IdState } from 'src/app/user/userRedux/user.reducer';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userId;
  constructor(
    private _fireStore: AngularFirestore,
    private _userRDX:Store<IdState>
  ) { }


  async createUser(userData) {
    const currentUser = await this._fireStore.doc('eventSite/users').collection('users').add({ ... userData});
    this._userRDX.dispatch(updateUserId({id: currentUser.id}));
    this.userId = currentUser.id;
    //  collection('users').add({ ...userData });
    console.log(currentUser);
  }

  async createCustomer(customerData) {
    const currentObjectId = await this._fireStore.doc(`eventSite/users/users/RbYUZRGlFY4sk3mt0WLN`).collection('customer').add({ ...customerData });
    console.log(currentObjectId)
  }

  getCustomers() {
    return this._fireStore.doc('eventSite/users/users/RbYUZRGlFY4sk3mt0WLN').collection('customer')
  }

}
