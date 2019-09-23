import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  private _messages$ = new BehaviorSubject(null);

  constructor(
    private http: HttpClient
  ) {

  }

  getAllMessages() {
    return this._messages$
  }

  setMessages(messages) {
    this._messages$.next(messages)
  }

  sendOneMessage(msg) {
    return this.http.post('messages', {
      msg: msg
    })
  }
}
