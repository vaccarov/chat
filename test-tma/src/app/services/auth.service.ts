import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs/operators";
import {Socket} from "ngx-socket-io";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user: any;
  private _authStatus$ = new BehaviorSubject({user: null, state: 'anonyme'})

  constructor(
    private http: HttpClient,
    private socket: Socket
  ) {
  }

  getUser() {
    return this._user
  }

  signIn(login, password) {
    return this.http.get('auth', {
      params: {
        login: login,
        password: password
      },
    }).pipe(
      tap((snap: any) => {
        this._user = snap.data;
        this._setConnected(snap.data);
      })
    )
  }

  signUp(login, password1, password2) {
    return this.http.post('auth', {
      login: login,
      password1: password1,
      password2: password2,
    }).pipe(
      tap((snap: any) => {
        this._user = snap.data;
        this._setConnected(snap.data);
      })
    )
  }

  getAuthStatus() {
    return this._authStatus$
  }

  private _setConnected(user) {
    if (this._authStatus$.value.state !== 'connected') {
      this._authStatus$.next({user, state: 'connected'})
    }
  }
}
