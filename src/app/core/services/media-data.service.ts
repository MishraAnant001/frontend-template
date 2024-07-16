import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MediaDataService {
  private likeApi = "http://localhost:8000/api/v1/media-data/like/"
  constructor(private http:HttpClient) { }

  addlike(fileid:string){
    return this.http.get(this.likeApi+`add/${fileid}`,{observe:'response'})
  }
  getLikes(){
    return this.http.get(this.likeApi+"get",{observe:'response'})
  }
  removeLike(fileid:string){
    return this.http.delete(this.likeApi+`remove/${fileid}`,{observe:'response'})
  }
}
