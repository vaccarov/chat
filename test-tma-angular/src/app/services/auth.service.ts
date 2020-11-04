import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, tap} from "rxjs/operators";
import {BehaviorSubject, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user: any;
  private _authStatus$ = new BehaviorSubject({user: null, state: 'anonyme'})

  constructor(
    private http: HttpClient,
  ) {
    const user = this._getLocalStorageUser();
    if (user) {
      this._setConnected(user)
    }
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

  isConnected() {
    return this._authStatus$
      .pipe(
        map((auth) => auth.state === 'connected')
      )
  }

  private _setLocalStorageUser(user) {
    localStorage.setItem('user', JSON.stringify(user))
  }

  private _getLocalStorageUser() {
    const userString = localStorage.getItem('user');
    if (userString) {
      return JSON.parse(userString);
    }
    return null
  }

  private _setConnected(user) {
    if (!user) {
      this._authStatus$.next({user: null, state: 'disconnected'})
      delete this._user;
      localStorage.removeItem('user');
    } else if (this._authStatus$.value.state !== 'connected') {
      this._authStatus$.next({user, state: 'connected'})
      this._setLocalStorageUser(user)
    }
  }

  logout(): Observable<boolean> {
    this._setConnected(undefined);
    return of(true);
  }
}
