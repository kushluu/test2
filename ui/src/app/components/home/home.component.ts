import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PropertydetailsService } from 'src/app/services/propertydetails.service';
import {Emitters} from '../emitters/emitters';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
property:any;
url:any='../assets/save-instagram.png';
lurl:any='../assets/download (1).png'
user_id:any;
authenticated = false;
msg:any;
wish:any;
idarr : any=[]
lat:any
locationid:any
lng:any
result:any
admin_msg:any
    constructor(private propertydetails:PropertydetailsService,private http:HttpClient ) {
   }
  ngOnInit(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
        if (position) {
          
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
        }
      }
      )
    }

    this.http.get('http://localhost:8000/api/user', {withCredentials: true}).subscribe(
      (res: any) => {
        this.user_id = res.id
        Emitters.authEmitter.emit(true);
    this.getwishlist()
     

      },
      err => {
        this.user_id = 'You are not logged in';
        Emitters.authEmitter.emit(false);
      }
    );
    Emitters.authEmitter.subscribe(
      (auth: boolean) => {
        this.authenticated = auth;
      }
    );

    
   
    this.getpropertydetails();

  }
  getwishlist(){
    this.propertydetails.GetWishList(this.user_id).subscribe((data: any) => { 
      this.wish=data 
      
      
      // this.wish = data.map((obj: string) => {
      //   return JSON.parse(obj.substring(1, obj.length-1))
      // })  
    }); 
  }
  getpropertydetails(){
    this.propertydetails.GetPropertyDetails().subscribe((data: any) => {  
      this.property = data;
      this.comparation()
    }); 
  }


  comparation(){
   
    setTimeout(() =>{
      console.log(this.wish);
      console.log(this.property);
      
        // for(let i=0;i<this.wish.length;i++){
        //   for(let j=0;j<this.property.length;i++){
        //     if(this.wish[i].property.id==this.property[j].id){
        //       this.idarr.push(this.wish[i].property.id)
        //     }
        //   }
        // }

        this.wish.forEach( (liked : any ) => {
          this.property.forEach( (prop : any ) => {
            if(liked.property.id==prop.id){
              this.idarr.push(liked.property.id)
            }
          })

        })
        
      // this.wish.forEach( (element : any ) => {
      // if(JSON.stringify(this.property).includes(JSON.stringify( element))){
      //   this.idarr.push(element.id)
      //   console.log(element.id)
      // }
    // });
    },500);
   
  }
















  gifUrl: any
  like_func(p:any){
  if((document.getElementById(p) as HTMLImageElement).src=='http://localhost:4200/assets/save-instagram.png')
  {
    (document.getElementById(p) as HTMLImageElement).src ='../assets/b8cf78c6cd751c3331a96b4ed0b08e81.gif';
    setTimeout(() =>{
      (document.getElementById(p) as HTMLImageElement).src ='../assets/download (1).png';
    },2000);
  }
  else{
    (document.getElementById(p) as HTMLImageElement).src ='../assets/b8cf78c6cd751c3331a96b4ed0b08e81.gif';
    setTimeout(() =>{
      (document.getElementById(p) as HTMLImageElement).src ='../assets/save-instagram.png';
    },2000);
  }
   
    this.propertydetails.like_post(p,this.user_id)
    .subscribe((data: any) => {  
      this.msg = data; 
    }); 

  }
  One_filter(str:string){
    this.property=[]
    this.propertydetails.GetOnefilterDetails(str).subscribe((data: any) => {  
      this.property = data; 
    }); 

  }
 
  search2(eventData:{serch:any}){
    this.property=eventData.serch
  }
  location(long:any,lat:any,pid:any){
    this.locationid=pid
    // this.result=this.lat

    this.result=0
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat-this.lat);  // deg2rad below
    var dLon = this.deg2rad(long-this.lng); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(this.lat)) * Math.cos(this.deg2rad(this.lat)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    this.result=Math.floor( d )
    // console.log(this.result);
    

  }

  deg2rad(deg:any) {
    return deg * (Math.PI/180)
  }
}

