import { Injectable, inject, signal } from "@angular/core";
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, user, idToken, signInWithPopup } from "@angular/fire/auth";
import { getAuth, GoogleAuthProvider, updateProfile } from "firebase/auth";
import { Observable, from } from "rxjs";
import { UserInterface } from "./user.interface";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  firebaseAuth = inject(Auth)
  user$ = user(this.firebaseAuth);
  idToken$ = idToken(this.firebaseAuth);  
  currentUserSig = signal<UserInterface | null | undefined>(undefined);
  idTokenSig = signal<string | null | undefined>(undefined);

  provider = new GoogleAuthProvider();

  // register(
  //   email: string,
  //   username: string,
  //   password: string
  // ): Observable<void> {
  //   const promise = createUserWithEmailAndPassword(
  //     this.firebaseAuth,
  //     email,
  //     password
  //   ).then((response) => {
  //     updateProfile(response.user, { displayName: username })
  //   });

  //   return from(promise);
  // }

  // login(
  //   email: string,
  //   password: string
  // ): Observable<void> {
  //   const promise = signInWithEmailAndPassword(this.firebaseAuth, email, password).then(() => {});
  //   return from(promise)
  // }

  logout(): Observable<void> {
    const promise = signOut(this.firebaseAuth)
    return from(promise);
  }

  signInwithGoogle() {
    const auth = getAuth();
    signInWithPopup(auth, this.provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

}