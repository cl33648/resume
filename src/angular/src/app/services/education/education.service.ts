import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {tap} from "rxjs/operators";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class EducationService {

  constructor(private http : HttpClient) { }

  private backendUrl = environment.apiUrl;

  addEducation(data: any){
    return this.http.post<any>(this.backendUrl + "/api/v1/education", data);
  }

  getAllEducations(){
    const url = this.backendUrl + "/api/v1/education";
    return this.http.get<any>(url)
      .pipe(
        tap(() => {
          console.log(`Request sent to ${url}`);
        })
      );
  }

  putEducation(data: any, id: number){
    return this.http.put<any>(this.backendUrl + "/api/v1/education/"+id, data);
  }

  deleteEducation(id: number){
    return this.http.delete<any>(this.backendUrl + "/api/v1/education/"+id);
  }
}
