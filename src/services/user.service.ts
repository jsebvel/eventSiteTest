import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private _fireStore: AngularFirestore
  ) { }

 async  createCustomer() {
   const currentCustomer = {
    name: 'Any customer',
    service_room: true,
    service_delivery: true,
    service_take_away: true,
    service_book: true,
    service_table: true,
    number_of_branches: 5
   }
    const currentObjectId = await this._fireStore.doc('user/customer').collection('customer').add({ ...currentCustomer });
    console.log(currentObjectId)


  }
}
