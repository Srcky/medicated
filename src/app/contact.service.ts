import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(private http: HttpClient) {}

  sendMail(url, data): Observable<any> {
    return this.http.post(url, data, { responseType: 'text' });
  }
}
