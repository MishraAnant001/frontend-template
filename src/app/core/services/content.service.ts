import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private postApi = "http://localhost:8000/api/v1/content/create"
  private getApi = "http://localhost:8000/api/v1/content/get-content"
  private getAllApi = "http://localhost:8000/api/v1/content/get-all-content"
  private updateApi = "http://localhost:8000/api/v1/content/"
  private getFeedApi = "http://localhost:8000/api/v1/content/feed"
  constructor(private http: HttpClient) { }

  uploadContent(data: { title: string, content: string }) {
    return this.http.post(this.postApi, data, { observe: 'response' })
  }

  getContent() {
    return this.http.get(this.getApi, { observe: 'response' })
  }

  updateContent(id: string, data: { title: string, content: string }) {
    return this.http.put(this.updateApi + id, data)
  }
  deleteContent(id: string) {
    return this.http.delete(this.updateApi + id)
  }
  getAllContent() {
    return this.http.get(this.getAllApi)
  }
  getFeed(){
    return this.http.get(this.getFeedApi)
  }
}
