import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';

import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { VERSION } from '@angular/platform-browser-dynamic';

@Component({
  selector: 'app-adminproperty',
  templateUrl: './adminproperty.component.html',
  styleUrls: ['./adminproperty.component.css'],
  providers: [NgbCarouselConfig] 
})
export class AdminpropertyComponent implements OnInit {

  name = 'Angular ' + VERSION.major;

  images = [700, 800, 807].map((n) => `https://picsum.photos/id/${n}/900/500`);

  property:any;
  public id:number=0;
  user:any;
  reviewer:any;
  url='';
  reviews:any
  imges:any;
  contact:boolean=true;
  reports:any;
  reportid:any;
  temp:any;
  reporter_msg:any;
  seller_msg:any;
  seller=false;
  reporter=false;
  // images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  constructor(private route: ActivatedRoute,private http: HttpClient,config: NgbCarouselConfig) {
    config.interval = 2000;
    config.keyboard = true;
    config.pauseOnHover = true;

   }

  ngOnInit(): void {
    this.route.params.subscribe(params=> {
      this.id=params['id']
    });

    this.route.params.subscribe(params=> {
      this.reportid=params['reportid']
    });


    const str='http://localhost:8000/apiapp/'+this.id
    this.http.get(str, {withCredentials: true}).subscribe(
      (res: any) => {
        this.property = res;
        console.log(res);
        
        this.url='http://localhost:8000/api/user/' + res[0]['malik']
        this.http.get(this.url, {withCredentials: true}).subscribe(
          (rest: any) => {
            this.user = rest;
            console.log(this.user);
            this.contact=!(this.property[0].malik==this.reviewer?.id)            
            console.log(this.contact);

            
          }
        ); 
      });


      const url='http://localhost:8000/apiapp/getreview/'+this.id
      this.http.get(url, {withCredentials: true}).subscribe(
        (rest: any) => {
          this.reviews = rest;
          console.log(this.reviews);
          
        }
      ); 


      this.http.get('http://localhost:8000/apiapp/imges/'+this.id).subscribe(
        (res:any)=>{
          this.imges=res
          
        }
      ) 

      this.http.get('http://localhost:8000/apiapp/reports/'+this.reportid).subscribe(
        (res:any)=>{
          this.reports=res
          console.log(this.reports);
          
        }
      )
  }


  delete_property(){
    this.temp='property'
    this.http.delete('http://localhost:8000/apiapp/delete_product/'+this.reports[0].property_id).subscribe(
      (res:any)=>{
       console.log(res); 
      }
    )
  }
  message_to_reporter(){
    alert(JSON.stringify({report_id:this.reports[0].id,msg:this.reporter_msg,receiver_id:this.reports[0].reporter_id}))
    this.http.post('http://localhost:8000/apiapp/message_from_admin',{report_id:this.reports[0].id,msg:this.reporter_msg,receiver_id:this.reports[0].reporter_id}).subscribe(
      (res:any)=>{
       console.log(res); 
       this.reporter=true
      }
    )
  }
  message_to_seller(){
    alert(JSON.stringify({report_id:this.reports[0].id,msg:this.reporter_msg,receiver_id:this.property[0].malik}))
    this.http.post('http://localhost:8000/apiapp/message_from_admin',{report_id:this.reports[0].id,msg:this.reporter_msg,receiver_id:this.property[0].malik}).subscribe(
      (res:any)=>{
       console.log(res); 
       this.seller=true
      }
    )
  }
}
