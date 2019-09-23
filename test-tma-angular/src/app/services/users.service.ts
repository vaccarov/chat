import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {Socket} from "ngx-socket-io";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private _users: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(null)

  constructor(
    private _http: HttpClient,
    private socket: Socket
  ) {
  }

  setUsers(users) {
    tap((users: any[]) => {
      this._users.next(users)
    })
  }

  getAll() {
    return this._users;
  }
}
