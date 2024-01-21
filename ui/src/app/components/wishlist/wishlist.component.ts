import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { PropertydetailsService } from 'src/app/services/propertydetails.service';
import {Emitters} from '../emitters/emitters';


@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
user:any;
property:any;
cid:any;
url="../../assets/icons8-delete-128.png"
msg:any;
  constructor(private http: HttpClient,private propertydetails:PropertydetailsService) { }

  ngOnInit(): void {
    this.http.get('http://localhost:8000/api/user', {withCredentials: true}).subscribe(
      (res: any) => {
        this.cid = res.id
        Emitters.authEmitter.emit(true);
      },
    );
   

    this.http.get('http://localhost:8000/api/user', {withCredentials: true}).subscribe(
      (res: any) => {
    this.getpropertydetails(res.id);
      }
    );
    
  }
  getpropertydetails(tem:any){
    console.log()
    this.propertydetails.GetWishList(tem).subscribe((data: any) => {  
      console.log(data);
      this.property=data
      // this.property = data.map((obj: string) => {
      //   return JSON.parse(obj.substring(1, obj.length-1))
      // }) 
      console.log(this.property)
    }); 
  }
delete(id:any){
  this.propertydetails.delete(id,this.cid)
  .subscribe((data: any) => {  
    this.msg = data; 
    this.getpropertydetails(this.cid);
  }); 


}
}
