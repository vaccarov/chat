import {Component} from '@angular/core';
import {first, switchMap, tap} from "rxjs/operators";
import {AuthService} from "./services/auth.service";
import {SocketService} from "./services/socket.service";
import {of} from "rxjs";
import {MessagesService} from "./services/messages.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor(
    private _socketService: SocketService,
    private _messageService: MessagesService,
    private auth: AuthService
  ) {
    this.auth.getAuthStatus()
      .pipe(
        switchMap(authState => {
          if (authState.state === 'connected') {
            return this._socketService.initSocket()
          }
          return of()
        })
      ).subscribe()
  }


}
