import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

interface User {
    // fname: string,
    email: string;
    uid: string;
}

@Injectable() // Makes it injectable to other components
export class UserService {
    private user: User;
    private _user = {
        id: 'abc',
        name: 'Bridge360'
    };

    get User() {
      return this._user;
    }

    constructor(private afAuth: AngularFireAuth) {

    }

    setUser(user: User) {
        this.user = user;
    }

    getUID() {
        if (!this.user) {
            if (this.afAuth.auth.currentUser) {
                const user = this.afAuth.auth.currentUser;
                this.setUser({
                    email: user.email,
                    uid: user.uid
                });
            }
        }
        return this.user.uid;
    }
}
