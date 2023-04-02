import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AccessService {

  private backendUrl = environment.apiUrl;

  private loggedIn = new BehaviorSubject<boolean>(false);
  loggedIn$ = this.loggedIn.asObservable();

  constructor(private http : HttpClient) { }

  setLoggedIn(value: boolean) {
    this.loggedIn.next(value);
  }

  getUser(){
    const url = this.backendUrl + "/api/v1/admin";

    return this.http.get<any>(url)
      .pipe(
        tap(() => {
          console.log(`Request sent to ${url}`);
        })
      );
  }
}
