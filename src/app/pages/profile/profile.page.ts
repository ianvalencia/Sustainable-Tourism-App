import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore'
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(private afs: AngularFirestore, private user: UserService) { 

   // userInfo:

    const info = afs.doc(`users/${user.getUID()}`)
   // this.userInfo = info.valueChanges()

  }

  ngOnInit() {
  }

}
