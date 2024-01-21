import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {  FormBuilder, Validators} from '@angular/forms';
import { formatDate } from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-adminproduct',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class AdminProductComponent implements OnInit {
  property:any;
  gif=3;
  public id:number=0;
  user:any;
  reviewer:any;
  authenticated = false;
  url='';
  rating=3
  subject='average'
  review='no comments'
  reviews:any
  book=false
  date:any
  about:any
  appoint:any
  successmsg:any
  reportmsg:any
  imges:any;
  contact:boolean=true;
  surveyForm: any;
  ratechange(gf:number){
    this.gif=gf
  }

    
    constructor( private formBuilder: FormBuilder,private router: Router,private route: ActivatedRoute,private http: HttpClient,private fb: FormBuilder) { 

  
  }

  ngOnInit():void {

    this.surveyForm = this.formBuilder.group({
      report:['',Validators.required],
    })

    const firstTime = localStorage.getItem('key')
 if(!firstTime){
  localStorage.setItem('key','loaded')
  location.reload()
 }else {
   localStorage.removeItem('key') 
 }
 
    this.http.get('http://localhost:8000/api/user', {withCredentials: true}).subscribe(
      (rest: any) => {
        this.reviewer = rest;
        console.log(this.reviewer.id);
        
      }
    ); 

    this.route.params.subscribe(params=> {
      this.id=params['id']
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
            this.contact=!(this.property[0].malik==this.reviewer.id)            
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
  }
submit(){
let data={
'rating':this.gif,
'subject':this.subject,
'review':this.review,
'property_id':this.id,
'reviewer_id':this.reviewer.id
}
const url='http://localhost:8000/apiapp/review'
this.http.post(url,data).subscribe(
  ()=>this.router.navigate([''])
)
alert(JSON.stringify(data))
}
toggler(){
  this.book=true
}
bookappointment(){
  if (this.date){
    let date1 = formatDate(new Date(),'yyyy-MM-dd','en_US');
  let date2 = formatDate(this.date,'yyyy-MM-dd','en_US');

  if(date1>date2){
    alert('cannot book appointment for previous days')
   }else{
    let data={
      'date':this.date,
      'about':this.about,
      'customer':this.reviewer.id,

      'malik_id':this.property[0]['malik']
      }
      this.http.post('http://localhost:8000/apiapp/bookappointment',data).subscribe(
        (temp:any)=>
        {
          if(temp){
            this.successmsg=true
          }
        }
        
      )

    alert(JSON.stringify(data))
   }
   
 

}

else
{
  alert('fill the date')
  }
}
subscribe(){
  this.router.navigate(['/subscribe'])
}
report(){
  let data={
    'property_id':this.id,
    'reporter_id':this.reviewer.id
    }

    this.http.post('http://localhost:8000/apiapp/report',{...this.surveyForm.value,...data}).subscribe(
      (temp:any)=>
      {
        if(temp){
          this.reportmsg=true
        }
      }
      
    )

  alert(JSON.stringify({...this.surveyForm.value,...data}))
}
}
