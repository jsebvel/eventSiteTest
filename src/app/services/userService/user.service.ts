import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { getUserId, updateUserId } from 'src/app/user/userRedux/user.actions';
import { IdState } from 'src/app/user/userRedux/user.reducer';
import { SessionUser } from 'src/models/sessionUser';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { MessagesService } from '../messageService/message.service';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  userId;
  constructor(
    private _fireStore: AngularFirestore,
    private _userRDX: Store<IdState>,
    public auth: AngularFireAuth,
    private _messageService: MessagesService,
  ) {
    this._userRDX.select('id').subscribe(id => {
      this.userId = id;
    });
  }


  registerUser(userData) {
    const { email, password } = userData;
    return this.auth.createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        const newUser = new SessionUser(user.uid, userData.name, user.email);
        return this._fireStore.doc(`${newUser.uid}/user`)
          .set({ ...userData })
      });
  }

  login(userData) {
    const { email, password } = userData;
    const currentUser = this.auth.signInWithEmailAndPassword(email, password);
    return currentUser;
  }

  /**
   *
   * @param userData the user info to create the register on firebase
   * @description Create the user credential and user data when register
   */
  // async createUser(userData) {
  //   const currentUser = await this._fireStore.doc(`${sessionStorage.getItem('userId')}/user`).collection('users').add({ ...userData });
  //   this._userRDX.dispatch(updateUserId({ id: currentUser.id }));
  //   this.userId = currentUser.id;
  // }

  async createCustomer(customerData) {
    const currentObjectId = await this._fireStore.doc(`${sessionStorage.getItem('userId')}/customer`).collection('customers').add({ ...customerData });
    if (currentObjectId.id) {
      this._messageService.customerActions('success');
    }
  }

  /**
   * @description get the customer info to show on Edition Component
   * @returns customer info with it's own id
   */
  getCustomers() {
    try {
      const data = this._fireStore.doc(`${sessionStorage.getItem('userId')}/customer`).collection('customers')
      const ids = data.snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
      return ids;
    } catch (error) {
      this._messageService.errorMessage();
      return error;
    }

  }

  isAuth() {
    return this.auth.authState.pipe(
      map(fbUser => fbUser != null)
    );
  }

  /**
   * @description get the current user data from firebase
   * @returns the user data from current user
   */
  getUserData() {
    return this._fireStore.doc(`${sessionStorage.getItem('userId')}/user`)
  }

  signOut() {
    this._userRDX.dispatch(updateUserId({ id: '' }))
    this.auth.signOut();
    sessionStorage.clear();
  }

  /**
   * @description Update the customer send.
   * @param customer customer info
   * @param id Id corresponding to customer to update
   */
  updateCustomerInfo(customer, id) {
    this._fireStore.doc(`${sessionStorage.getItem('userId')}/customer/customers/${id}`).update({ ...customer });
    this._messageService.customerActions('update');
  }

  /**
   * @description Delete the customer by id
   * @param id  Id corresponding to customer to update
   */
  deleteCustomer(id) {
    const resp = this._fireStore.doc(`${sessionStorage.getItem('userId')}/customer/customers/${id}`).delete();
    if (resp) {
      this._messageService.customerActions('delete');
    }
  }

}
