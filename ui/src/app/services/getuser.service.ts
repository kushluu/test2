import { Injectable } from '@angular/core';
import {Emitters} from '../components/emitters/emitters';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetuserService {

  constructor(private http: HttpClient) { }

  getuser():Observable<any>{
  return this.http.get('http://localhost:8000/api/user')
}
}