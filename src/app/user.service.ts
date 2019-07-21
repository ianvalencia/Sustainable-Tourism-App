import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { tap } from "rxjs/operators";

interface User {
  // fname: string,
  id: string;
  name: string;
}

@Injectable() // Makes it injectable to other components
export class UserService {
  private _userIsAuthenticated = false;

  private user: User;
  // private _user = {
  //   id: "def",
  //   name: "Juan Dela Cruz"
  // };
  private _user: User;

  get User() {
    return this._user;
  }

  constructor(
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore
  ) {}

  get userIsAuthenticated() {
    return this._userIsAuthenticated;
  }

  login() {
    this._userIsAuthenticated = true;
  }

  logout() {
    this._userIsAuthenticated = false;
  }

  setUser() {
    const user = this.afAuth.auth.currentUser;

    return this.afStore
      .doc(`users/${user.uid}`)
      .get()
      .pipe(
        tap(doc => {
          console.log(doc.data().displayName);
          this._user = {
            id: user.uid,
            name: doc.data().name
          };
        })
      );
  }

  // getUID() {
  //   if (!this._user) {
  //     if (this.afAuth.auth.currentUser) {
  //       this.setUser();
  //     } else {
  //       console.log('No user found!');
  //     }
  //   }
  //   console.log(this.afAuth.auth.currentUser);
  //   return this.user.uid;
  // }
}
