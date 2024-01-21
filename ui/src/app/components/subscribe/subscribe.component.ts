import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.css']
})
export class SubscribeComponent implements OnInit {
  temp=1
  payd=0
  id:any
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }
  toggle0(){
    this.temp=0;
  }
  toggle1(){
    this.temp=1;
  }
  payment(){
    this.http.get('http://localhost:8000/api/user', {withCredentials: true}).subscribe(
      (rest: any) => {
        this.id = rest.id;
        this.http.post('http://localhost:8000/api/subscribe',{'id':this.id}).subscribe(
          (msg: any) => {
           console.log(msg);
          }
        )
        
      }
    ); 
   
    this.payd=1
  
  }
}
