import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase} from '@angular/fire/database';

@Injectable()
export class MessageService {

  constructor(private db: AngularFireDatabase) { }

  // Retrieve the message from the Db then return the values as an observable.
  getContent(): Observable<any> {
    const ref = this.db.object('alert/testAlert');
    return ref.valueChanges();
  }
}
