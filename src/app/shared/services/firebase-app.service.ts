import { Injectable } from '@angular/core';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FirebaseAppService {
  firabaseApp!: FirebaseApp;
  constructor() {
    this.firabaseApp = initializeApp(environment.firebase);
  }

  getFirebaseApp = () => {
    return this.firabaseApp;
  };
}
