import { AfterViewInit,Component,  ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements AfterViewInit {
  data:any;
  displayedColumns: string[] = ['id', 'u_name', 'email_id', 'is_superuser','subscription','edit','Action'];


  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  constructor(private http:HttpClient) { 
    this.userdetails()
  }
  dataSource!: any;
  search : String ="";
  userdetails(){
    this.http.get('http://localhost:8000/api/usersData', {withCredentials: true}).subscribe(
      (res: any) => {
        this.data=res
        this.dataSource = new MatTableDataSource<user>(this.data)
        this.dataSource.paginator = this.paginator;
  }
    );
  }
  ngAfterViewInit() {
    
}

deleteuser(id:any){
  this.http.post('http://localhost:8000/api/deleteuser', {'id':id}).subscribe(
    (res: any) => {
      this.data=res
      this.dataSource = new MatTableDataSource<user>(this.data)
      this.dataSource.paginator = this.paginator;
}
  );
}
edituser(id:any){
  this.http.post('http://localhost:8000/api/superuser', {'id':id}).subscribe(
    (res: any) => {
      this.data=res
      this.dataSource = new MatTableDataSource<user>(this.data)
      this.dataSource.paginator = this.paginator;
}
  );
}

searchfunc(){
  this.http.post('http://localhost:8000/api/searchuser', {'key':this.search}).subscribe(
    (res: any) => {
      this.data=res
      this.dataSource = new MatTableDataSource<user>(this.data)
      this.dataSource.paginator = this.paginator;
}
  ); 
}
}

  export interface user{
    u_name:string;
    id:number;
    is_superuser:boolean;
    email_id:string;
    subscription:boolean;
  }
  


