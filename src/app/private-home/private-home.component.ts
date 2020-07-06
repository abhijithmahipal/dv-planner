import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FirestoreService } from '../services/firestore.service';
import { DVMessage } from '../models/dvmessage';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-private-home',
  templateUrl: './private-home.component.html',
  styleUrls: ['./private-home.component.scss']
})
export class PrivateHomeComponent implements OnInit {
  leftMessage: string;
  user: any;
  leftMessages: DVMessage[];
  rightessages: DVMessage[];
  messages: DVMessage[];
  constructor(
    private auth: AuthService,
    private firestoreService: FirestoreService
  ) { }

  ngOnInit(): void {
    this.getUser();
    this.getMessage();
  }


  private getUser() {
    this.auth.getUser().subscribe((user) => {
      this.user = user;
    },
      (err) => {
        console.log(err.message);
      });
  }

  saveLeft(f: NgForm) {
    const {leftip} =  f.form.value;
    const obj: DVMessage = { id: this.user.uid, message: leftip, updatedOn: new Date(), direction: 'left' };;
    return this.firestoreService.createMessage(obj);
  }
  saveRight(f: NgForm) {
    const {rightip} =  f.form.value;
    const obj: DVMessage = { id: this.user.uid, message: rightip, updatedOn: new Date(), direction: 'right' };;
    return this.firestoreService.createMessage(obj);
  }
  getMessage() {
    return this.firestoreService.getMessages().subscribe((msg) => {
      this.messages = msg;
      console.log(this.messages);
    }, (err) => {
      console.log(err.message);
    });
  }
}
