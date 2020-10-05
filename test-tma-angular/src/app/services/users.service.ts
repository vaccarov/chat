import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {Socket} from "ngx-socket-io";
import {first, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private _users: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([])

  constructor(
    private _http: HttpClient,
    private socket: Socket
  ) {
    this.initUsers().subscribe()
  }

  initUsers() {
    return this._http.get('users')
      .pipe(
        first(),
        tap((res: any) => this.setUsers(res.data))
      )
  }

  setUsers(users) {
    console.log(users);
      this._users.next(users)
  }

  getAll() {
    return this._users as Observable<any[]>;
  }
}
