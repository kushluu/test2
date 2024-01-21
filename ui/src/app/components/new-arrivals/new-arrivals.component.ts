import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-new-arrivals',
  templateUrl: './new-arrivals.component.html',
  styleUrls: ['./new-arrivals.component.css']
})
export class NewArrivalsComponent implements OnInit {
  property:any;
  url:any='../assets/save-instagram.png';
  // temp=0
  constructor(private http:HttpClient) { 
  }

  ngOnInit(): void {
  //   if(this.temp==0){
  //  this.reloadPage()
  //   }
    this.http.get('http://localhost:8000/apiapp/newarrivals', {withCredentials: true}).subscribe(
      (res: any) => {
        this.property = res;
        console.log(res);       
      }
    ); 
  }

  reloadPage() {
    // this.temp=1
    window.location.reload();
 }
}
