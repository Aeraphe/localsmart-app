import { Injectable } from '@angular/core';
import {
  Auth,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  User,
  onAuthStateChanged,
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
  private isAuthenticated = false;

  constructor(private firebaseApp: FirebaseAppService) {
    let app = firebaseApp.getFirebaseApp();
    this.auth = getAuth(app);
    this.user$.subscribe((user) => {
      this.isAuthenticated = user ? true : false;
    });
  }

  loginFirebase = async (email: string, pass: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        this.auth,
        email,
        pass
      );

      this.isAuthenticated = userCredential.user ? true : false;

      return { status: true, data: userCredential.user };
    } catch (error) {
      return { status: false, error: error };
    }
  };

  logoutFirebase = async () => {
    try {
      await signOut(this.auth);
      this.isAuthenticated = false;
    } catch (error) {
      console.error(error);
    }
  };

  monitorAuthState = (): Observable<User | null> => {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.sub.next(user);
      } else {
        this.sub.next(null);
      }
    });

    return this.user$;
  };

  isUserAuthenticate = () => {
    return this.isAuthenticated;
  };
}
