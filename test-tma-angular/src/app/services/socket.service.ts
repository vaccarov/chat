import {Injectable} from '@angular/core';
import {UsersService} from "./users.service";
import {MessagesService} from "./messages.service";
import {mergeAll, tap} from "rxjs/operators";
import {Socket} from "ngx-socket-io";
import {combineLatest, merge} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(
    private _socket: Socket,
    private _userService: UsersService,
    private _messagesService: MessagesService
  ) {
  }

  initSocket() {
    return combineLatest([
      this._getUsers(),
      this._getMessages()
    ])
  }

  private _getUsers() {
   return  this._socket.fromEvent('users')
      .pipe(
        tap(users => {
          console.log(users);
          this._userService.setUsers(users)
        })
      )
  }

  private _getMessages() {
   return  this._socket.fromEvent('messages')
      .pipe(
        tap(messages => this._messagesService.setMessages(messages))
      )
  }
}
