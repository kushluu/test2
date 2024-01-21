import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PropertydetailsService } from 'src/app/services/propertydetails.service';

@Component({
  selector: 'app-adminprofile',
  templateUrl: './adminprofile.component.html',
  styleUrls: ['./adminprofile.component.css']
})
export class AdminprofileComponent implements OnInit {
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


  constructor(private http:HttpClient,private img:PropertydetailsService) { }

  ngOnInit(): void {

    this.http.get('http://localhost:8000/api/user', {withCredentials: true}).subscribe(
      (res: any) => {
        this.user = res;
        console.log(this.user)
   
      }
    ); 

  }
  toggle(){
    this.flag=true
  }
  onFileSelected(event:any){
    this.img.upload_user_image(event.target.files[0]).subscribe(data=>{
        this.img_url=data;
        this.profileimg=data;
        console.log(data)
    })
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
}
