import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FirestoreService } from '../services/firestore.service';
import { DVMessage } from '../models/dvmessage';
import { NgForm } from '@angular/forms';
import { sortBy } from 'lodash';
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
  @ViewChild('scrollLeft') private scrollLeft: ElementRef;
  @ViewChild('scrollRight') private scrollRight: ElementRef;
  constructor(
    private auth: AuthService,
    private firestoreService: FirestoreService
  ) { }

  ngOnInit(): void {
    this.getUser();
    this.getMessage();
    this.scrollToBottom();
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
    if (f.invalid) {
      return;
    }
    const { leftip } = f.form.value;
    const obj: DVMessage = { id: this.user.uid, message: leftip, updatedOn: new Date(), direction: 'left' };
    f.resetForm();
    return this.firestoreService.createMessage(obj);
  }
  saveRight(f: NgForm) {
    if (f.invalid) {
      return;
    }
    const { rightip } = f.form.value;
    const obj: DVMessage = { id: this.user.uid, message: rightip, updatedOn: new Date(), direction: 'right' };
    f.resetForm();
    return this.firestoreService.createMessage(obj);
  }
  getMessage() {
    return this.firestoreService.getMessages().subscribe((msg) => {
      this.messages = msg.filter(a => a.id === this.user.uid);
      this.messages = sortBy(this.messages, m => m.updatedOn);
      this.scrollToBottom();
    }, (err) => {
      console.log(err.message);
    });
  }
  scrollToBottom(): void {
    setTimeout(() => {
      this.scrollLeft.nativeElement.scrollTop = this.scrollLeft.nativeElement.scrollHeight;
      this.scrollRight.nativeElement.scrollTop = this.scrollRight.nativeElement.scrollHeight;
    }, 100)
  }
}
