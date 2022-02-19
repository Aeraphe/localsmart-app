import { Injectable } from '@angular/core';

import { FirebaseAppService } from './firebase-app.service';
import { FirebaseStorage, getStorage } from 'firebase/storage';

@Injectable({
  providedIn: 'root',
})
export class FirebaseStorageService {
  constructor(private fireApp: FirebaseAppService) {}

  getStorage = (
    sotrageLink = 'gs://localsmart-app.appspot.com'
  ): FirebaseStorage => {
    return getStorage(this.fireApp.getFirebaseApp(), sotrageLink);
  };
}
