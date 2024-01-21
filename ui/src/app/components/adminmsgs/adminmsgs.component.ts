import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-adminmsgs',
  templateUrl: './adminmsgs.component.html',
  styleUrls: ['./adminmsgs.component.css']
})
export class AdminmsgsComponent implements OnInit {
  admin_msg:any
  use:any
  constructor(private http:HttpClient) { }

  ngOnInit(): void {

    this.http.get('http://localhost:8000/api/user', {withCredentials: true}).subscribe(
      (res: any) => {
        this.use=res
        console.log(this.use);

        this.http.get('http://localhost:8000/apiapp/get_msg_from_admin/'+res.id).subscribe(
          (res:any)=>{
            this.admin_msg=res
            console.log(res);
          }
         ) 
      })

  }

}
