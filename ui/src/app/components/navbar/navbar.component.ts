import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {Emitters} from '../emitters/emitters';
import {HttpClient} from '@angular/common/http';
import { AdminmsgsComponent } from '../adminmsgs/adminmsgs.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user_name = '';
  authenticated = false;
  key:any;
  properties:any;
  use:any;

  admin_msg:any;
  constructor(private http: HttpClient,public dialog:MatDialog) { }
  @Output()
  serchresult=new EventEmitter<{serch:any}>();

  ngOnInit(): void {

   
    
    this.http.get('http://localhost:8000/api/user', {withCredentials: true}).subscribe(
      (res: any) => {
        this.user_name = `Hi ${res.u_name}`;
        this.use=res
        console.log(this.use);

        this.http.get('http://localhost:8000/apiapp/get_msg_from_admin/'+res.id).subscribe(
          (res:any)=>{
            this.admin_msg=res
            console.log(res);
 
          }
         )
        
        Emitters.authEmitter.emit(true);
      },
      err => {
        this.user_name = 'You are not logged in';
        Emitters.authEmitter.emit(false);
      }
    );
  


    Emitters.authEmitter.subscribe(
      (auth: boolean) => {
        this.authenticated = auth;
      }
    );



  }

  logout(): void {
    this.http.post('http://localhost:8000/api/logout', {}, {withCredentials: true})
      .subscribe(() => this.authenticated = false);
  }
  search(){
  this.http.post('http://localhost:8000/apiapp/search',{'key':this.key}).subscribe((prop:any)=>{
    this.properties=''
    this.properties=prop
    this.serchresult.emit({serch:this.properties})

  })  
  }

  opendialog(){
    this.dialog.open(AdminmsgsComponent)
  }

}















