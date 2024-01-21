import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class NewsapiService {

  constructor(private http:HttpClient) { }
  // topnews='https://newsapi.org/v2/everything?q=tesla&from=2022-09-25&sortBy=publishedAt&apiKey=323ba540efcf4e21aff6b4dfe540a9ed';
  topnews='https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=323ba540efcf4e21aff6b4dfe540a9ed'
  topHeadlines():Observable<any>{
    return this.http.get(this.topnews);
  }
}
