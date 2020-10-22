import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {first, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  private _messages$ = new BehaviorSubject(null);

  constructor(
    private _http: HttpClient
  ) {
  }

  initMessages() {
    return this._http.get('messages')
      .pipe(
        tap(messages => this.setMessages(messages)),
        first(),
      )
  }

  getAllMessages() {
    return this._messages$
  }

  setMessages(messages) {
    this._messages$.next(messages)
  }

  sendOneMessage(msg) {
    return this._http.post('messages', {
      msg: msg
    })
  }
}
