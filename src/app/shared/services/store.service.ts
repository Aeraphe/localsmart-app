import { Injectable } from '@angular/core';
import { getFirestore, doc, updateDoc, onSnapshot } from 'firebase/firestore';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private collection = 'store';
  private storeId = 'RjpKMSrG6tDIlFCLzZBH';
  private db = getFirestore();

  private subjectStore = new Subject();
  public store$ = this.subjectStore.asObservable() as Observable<any>;

  constructor() {}

  getStore = () => {
    let storeRef = doc(this.db, this.collection + '/' + this.storeId);

    onSnapshot(storeRef, (doc: any) => {
      let store: any = [];

      store.push({ ...doc.data(), id: this.storeId });

      this.subjectStore.next(store);
    });

    return this.store$;
  };

  updateStore = async (data: object) => {
    try {
      let docRef = doc(this.db, this.collection, this.storeId);
      return await updateDoc(docRef, data);
    } catch (error) {
      console.log(error);
    }
  };
}
