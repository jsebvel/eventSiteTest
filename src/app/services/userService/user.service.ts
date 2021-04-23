import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { getUserId, updateUserId } from 'src/app/user/userRedux/user.actions';
import { IdState } from 'src/app/user/userRedux/user.reducer';
import { SessionUser } from 'src/models/sessionUser';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  userId;
  constructor(
    private _fireStore: AngularFirestore,
    private _userRDX: Store<IdState>,
    public auth: AngularFireAuth,
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
          .set({ ...newUser })
      });
  }

  login(userData) {
    const { email, password } = userData;
    const currentUser = this.auth.signInWithEmailAndPassword(email, password);
    return currentUser;
  }



  async createUser(userData) {
    const currentUser = await this._fireStore.doc(`${this.userId}/user`).collection('users').add({ ...userData });
    this._userRDX.dispatch(updateUserId({ id: currentUser.id }));
    this.userId = currentUser.id;
    console.log(currentUser);
  }

  async createCustomer(customerData) {
    const currentObjectId = await this._fireStore.doc(`${this.userId}/customer`).collection('customers').add({ ...customerData });
    console.log(currentObjectId)
  }

  getCustomers() {
    const data = this._fireStore.doc(`bMOh5AtRClM80yLbC6wPfPm26M92/customer`).collection('customers')
    const ids = data.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
    ids.subscribe(datat => {
      console.log(datat)
    })
    return ids;

  }

  isAuth() {
    return this.auth.authState.pipe(
      map(fbUser => fbUser != null)
    );
  }

  signOut() {
    this.auth.signOut();
  }

  updateInfo(customer, id) {
    this._fireStore.doc(`bMOh5AtRClM80yLbC6wPfPm26M92/customer/customers/${id}`).update({...customer});
  }



}
