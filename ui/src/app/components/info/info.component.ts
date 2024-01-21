import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PropertydetailsService } from 'src/app/services/propertydetails.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
id:any;
toggler:any;
user:any;
flag=false
img_url:any
property:any
url='../assets/icons8-delete-128.png'
form:any;
submitted:any;
u_name:any;
f_name:any;
l_name:any;
allappointments:any;
profileimg:any='../assets/no one.jpg';
msg:any;
  constructor( private router: Router,private http:HttpClient, private img:PropertydetailsService) { }

  ngOnInit(): void {

    this.http.get('http://localhost:8000/api/user', {withCredentials: true}).subscribe(
      (res: any) => {
        this.user = res;
        console.log(this.user)
    this.getpropertydetails();
    this.getappointments();
      }
    ); 



  }

toggle(){
  this.flag=true
}
getpropertydetails(){
  
  console.log("method")
  console.log(this.user.id);

  this.img.GetUserPropertyDetails(this.user.id).subscribe((data: any) => {  
    this.property = data; 
    console.log(data);
    
  }); 
}
onFileSelected(event:any){
  this.img.upload_user_image(event.target.files[0]).subscribe(data=>{
      this.img_url=data;
      this.profileimg=data;
      console.log(data)
  })
}
delete_func(id:any)
{
  this.img.delete_product(id).subscribe(
    data=>{
      console.log(data);
      this.getpropertydetails()
    },
    err=> console.log(err)
  )
  
}
submit(): void {
  this.submitted=true
  let data={
    'u_name':this.u_name,
    'f_name':this.f_name,
    'l_name':this.l_name,
    'profile':this.img_url,
    'id':this.user.id,
    }
         console.log('sub');
         
            this.http.put('http://localhost:8000/api/Edit_Profile', data).subscribe();
            alert('SUCCESS!! :-)\n\n' + JSON.stringify(data, null, 4));
            console.log('sub');
        
            this.flag=false
}
accept(id:any){
  this.http.get('http://localhost:8000/apiapp/accept/'+id).subscribe((data: any) => {  
    this.msg = data; 
    this.getappointments();

  });
            
}
reject(id:any){
  this.http.get('http://localhost:8000/apiapp/reject/'+id).subscribe((data: any) => {  
    this.msg = data; 
    this.getappointments();

  });

}
withdraw(id:any){

  this.http.delete('http://localhost:8000/apiapp/withdraw/'+id).subscribe((data: any) => {  
    this.msg = data; 
    this.getappointments();
    alert('appointment is removed')
  });

}
getappointments(){
  const url='http://localhost:8000/apiapp/my_appointments/'+this.user.id
  this.http.get(url, {withCredentials: true}).subscribe(
    (temp:any)=>
    {this.allappointments=temp
    console.log(this.allappointments)
    }
  ); 
}
delete_toggle(id:any){
    this.toggler=true
    this.id=id
}
cansel(){
  this.toggler=false
}
}

