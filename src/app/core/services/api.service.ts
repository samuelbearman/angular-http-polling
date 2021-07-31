import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from "../../../environments/environment";
import { Observable, throwError } from 'rxjs';

import { catchError, map } from 'rxjs/operators';
@Injectable({
  providedIn: "root",
})
export class ApiService {
  jsonHeadersConfig = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  constructor(private http: HttpClient) {}

  private formatErrors(error: any) {
    return throwError(error.error);
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http
      .get(`${environment.api_url}${path}`, { headers: this.jsonHeadersConfig, params })
      .pipe(catchError(this.formatErrors));
  }

  getFile(path: string): any {
    return this.http.get(`${environment.api_url}${path}`, { responseType: 'blob' }).pipe(
      map((result: any) => {
        return result;
      })
    );
  }

  postFileJson(path: string, params: any, ): Observable<Blob> {
    return this.http.post<Blob>(`${environment.api_url}${path}`, { responseType: 'blob' as "json" });
  }

  put(path: string, body: any = {}): Observable<any> {
    return this.http
      .put(`${environment.api_url}${path}`, JSON.stringify(body), {
        headers: this.jsonHeadersConfig,
      })
      .pipe(catchError(this.formatErrors));
  }

  post(path: string, body: any): Observable<any> {
    return this.http
      .post(`${environment.api_url}${path}`, body, {
        headers: this.jsonHeadersConfig,
      })
      .pipe(catchError(this.formatErrors));
  }

  postFormData(path: string, data: FormData): Observable<any> {
    return this.http
      .post(`${environment.api_url}${path}`, data)
      .pipe(catchError(this.formatErrors));
  }

  delete(path: string): Observable<any> {
    return this.http
      .delete(`${environment.api_url}${path}`, {
        headers: this.jsonHeadersConfig,
      })
      .pipe(catchError(this.formatErrors));
  }
}
