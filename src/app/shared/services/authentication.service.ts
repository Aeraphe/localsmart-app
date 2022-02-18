import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor() {}

  loginFirebase = async (email: string, pass: string) => {
    try {
      const logData = await firebase
        .auth()
        .signInWithEmailAndPassword(email, pass);
      if (logData.user) {
        const token = (await logData.user.getIdTokenResult()).token;
        const expirationTime = (await logData.user.getIdTokenResult())
          .expirationTime;
      }
      return { status: true, data: logData };
    } catch (error) {
      return { status: false, error: error };
    }
  };

  logoutFirebase = async () => {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      console.error(error);
    }
  };

  createAccount = async (data: any) => {
    try {
      const response = await firebase
        .auth()
        .createUserWithEmailAndPassword(data.email, data.password);
      await firebase.auth().currentUser?.updateProfile({
        displayName: data.name,
      });
      if (response.user) {
        const token = (await response.user.getIdTokenResult()).token;
        const expirationTime = (await response.user.getIdTokenResult())
          .expirationTime;
      }

      return response;
    } catch (error) {
      console.error(error);
    }
  };

  getCurrentUser = () => {
    return firebase.auth().currentUser
      ? firebase.auth().currentUser
      : undefined;
  };
}
