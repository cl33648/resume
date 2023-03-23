import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {tap} from "rxjs/operators";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  constructor(private http : HttpClient) { }

  private backendUrl = environment.apiUrl;

  addSkill(data: any){
    return this.http.post<any>(this.backendUrl + "/api/v1/skill", data);
  }

  getAllSkills(){
    const url = this.backendUrl + "/api/v1/skill";
    return this.http.get<any>(url)
      .pipe(
        tap(() => {
          console.log(`Request sent to ${url}`);
        })
      );
  }

  putSkill(data: any, id: number){
    return this.http.put<any>(this.backendUrl + "/api/v1/skill/"+id, data);
  }

  deleteSkill(id: number){
    return this.http.delete<any>(this.backendUrl + "/api/v1/skill/"+id);
  }
}
