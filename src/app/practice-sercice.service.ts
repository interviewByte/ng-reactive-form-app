import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PracticeSerciceService {
  constructor(private http: HttpClient) {}
  private baseUrl = 'https://jsonplaceholder.typicode.com/posts';

  // 1️ ****************** QUERY STRING ************
  getPostsByUserId(userId: number): Observable<any> {
    let params = new HttpParams();
    params = params.set('userId', userId);
    // WHEN MORE THAN ONE PARAMS
    // params = params.set('userId', userId);
    // params = params.set('page', page);
    return this.http.get(this.baseUrl, { params });
  }

  // 2️ ****************** ROUTE PARAMapp *********************
  getPostById(postId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${postId}`);
  }

  // 3. **************** Passing Query String Directly in URL **************
  getPostsByUserId_1(userId: number): Observable<any> {
    const url = `${this.baseUrl}?userId=${userId}`;
    return this.http.get(url);
  }

  // 4. ******************* Multiple Query Params in URL ************
  getPosts(userId: number, page: number): Observable<any> {
    const url = `${this.baseUrl}?userId=${userId}&page=${page}`;
    return this.http.get(url);
  }

  // ******************** POST API – payload in body **************************
  createPost(payload: any): Observable<any> {
    return this.http.post(this.baseUrl, payload);
  }

  createPost_2(title: string, body: string, userId: number) {
    const payload = {
      title: title,
      body: body,
      userId: userId,
    };

    return this.http.post(this.baseUrl, payload);
  }
}
