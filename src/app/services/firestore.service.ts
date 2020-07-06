import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { DVMessage } from '../models/dvmessage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore) { }

  createMessage(message: any) {
    return this.firestore.collection('messages').add(message);
  }
  getMessages(): Observable<DVMessage[]> {
    return this.firestore.collection<DVMessage>('messages').valueChanges();
  }
}
