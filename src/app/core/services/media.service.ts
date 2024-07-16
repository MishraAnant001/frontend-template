import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  private postApi = "http://localhost:8000/api/v1/media/upload"
  private getApi = "http://localhost:8000/api/v1/media/get-media"
  private getAllApi = "http://localhost:8000/api/v1/media/get-all-media"
  private deleteApi = "http://localhost:8000/api/v1/media/"
  private getFeedApi = "http://localhost:8000/api/v1/media/feed"
  constructor(private http: HttpClient) { }

  uploadMedia(data: FormData) {
    return this.http.post(this.postApi, data, { observe: "response" })
  }
  getMedia(){
    return this.http.get(this.getApi, { observe: "response" })
  }
  deleteMedia(id:string){
    return this.http.delete(this.deleteApi+id,{observe:'response'})
  }
  getAllMedia(){
    return this.http.get(this.getAllApi)
  }
  getFeed(){
    return this.http.get(this.getFeedApi)
  }
}
