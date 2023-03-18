import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {tap} from "rxjs/operators";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class WorkService {

  constructor(private http : HttpClient) { }

  private backendUrl = environment.apiUrl;

  addWorkExperience(data: any){
    return this.http.post<any>(this.backendUrl + "/api/v1/work", data);
  }

  getAllWorkExperiences(){
    const url = this.backendUrl + "/api/v1/work";
    return this.http.get<any>(url)
      .pipe(
        tap(() => {
          console.log(`Request sent to ${url}`);
        })
      );
  }

  putWorkExperience(data: any, id: number){
    return this.http.put<any>(this.backendUrl + "/api/v1/work/"+id, data);
  }

  deleteWorkExperience(id: number){
    return this.http.delete<any>(this.backendUrl + "/api/v1/work/"+id);
  }
}
