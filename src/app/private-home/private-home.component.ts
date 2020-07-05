import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-private-home',
  templateUrl: './private-home.component.html',
  styleUrls: ['./private-home.component.scss']
})
export class PrivateHomeComponent implements OnInit {
  test: string;
  user: any;
  constructor(
    private auth: AuthService,
    private firestoreService: FirestoreService
  ) { }

  ngOnInit(): void {
    this.auth.getUser().subscribe((user) => {
      this.user = user;
    },
      (err) => {
        console.log(err.message);
      });
  }


  createMessage () {
    console.log(this.user);
    const obj = { id: this.user.uid, message: this.test, updatedOn: new Date() };
    return this.firestoreService.createMessage(obj);
  }
}
