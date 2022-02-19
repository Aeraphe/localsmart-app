import { Injectable } from '@angular/core';
import {
  Auth,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth';
import { Observable, Subject } from 'rxjs';

import { FirebaseAppService } from './firebase-app.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private sub: Subject<User | null> = new Subject();
  private user$: Observable<User | null> = this.sub.asObservable();
  private auth: Auth;

  constructor(private firebaseApp: FirebaseAppService) {
    let app = firebaseApp.getFirebaseApp();
    this.auth = getAuth(app);
  }

  loginFirebase = async (email: string, pass: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        this.auth,
        email,
        pass
      );
      if (userCredential.user) {
        const token = (await userCredential.user.getIdTokenResult()).token;
        const expirationTime = (await userCredential.user.getIdTokenResult())
          .expirationTime;
      }
      return { status: true, data: userCredential.user };
    } catch (error) {
      return { status: false, error: error };
    }
  };

  logoutFirebase = async () => {
    try {
      await signOut(this.auth);
    } catch (error) {
      console.error(error);
    }
  };

  getCurrentUser = (): Observable<User | null> => {
    this.sub.next(this.auth.currentUser);
    return this.user$;
  };
}
