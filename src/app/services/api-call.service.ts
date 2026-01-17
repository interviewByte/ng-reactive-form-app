import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiCallService {
  private apiUrl = 'http://localhost:8000/test/v1/profile';

  constructor(private http: HttpClient) {}

  getProfile(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
  // Inside api-call.service.ts

  saveProfile(data: any) {
    // Regular JSON post
    return this.http.post('http://localhost:3000/test/v1/save-profile', data);
  }

  uploadDocuments(formData: FormData) {
    // Multipart/form-data post
    // Angular automatically sets the boundary and content-type
    return this.http.post(
      'http://localhost:3000/test/v1/upload-files',
      formData
    );
  }
}
