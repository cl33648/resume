import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CertificateService {

  constructor(private http : HttpClient) { }

  private backendUrl = environment.apiUrl;

  addCertificate(data: any){
    return this.http.post<any>(this.backendUrl + "/api/v1/certificate", data);
  }

  getAllCertificates(){
    const url = this.backendUrl + '/api/v1/certificate';
    return this.http.get<any>(url)
      .pipe(
        tap(() => {
          console.log(`Request sent to ${url}`);
        })
      );
  }

  putCertificate(data: any, id: number){
    return this.http.put<any>(this.backendUrl + "/api/v1/certificate/"+id, data);
  }

  deleteCertificate(id: number){
    return this.http.delete<any>(this.backendUrl + "/api/v1/certificate/"+id);
  }
}
