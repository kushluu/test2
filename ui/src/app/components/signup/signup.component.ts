
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import { PropertydetailsService } from 'src/app/services/propertydetails.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  form!: FormGroup;
  submitted=false
  pass=false
  img_url:any;
  missmatch=true
  url:any;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private img:PropertydetailsService
  ) { }

  onFileSelected(event:any){
    this.img.upload_user_image(event.target.files[0]).subscribe(data=>{
        this.img_url=data;
        this.url=data
        console.log(data)
    }) 
  }

  get f() { return this.form.controls; }
  ngOnInit(): void {
    this.url='../../../assets/no one.jpg';

    this.form = this.formBuilder.group({
      u_name: ['',Validators.required],
      f_name: ['',Validators.required],
      l_name: ['',Validators.required],
      email_id: ['',[Validators.required,Validators.email]],
      password: ['',[Validators.required,Validators.minLength(8)]],
      password2:['',Validators.required],
      profile:['']
    });
  }

  

  submit(): void {
  this.submitted=true
          // if(this.form.invalid){
          //   console.log(this.form)
          //   return;
          // }
          if(this.form.value.password==this.form.value.password2)
          {
            this.missmatch=true
            console.log(this.img_url);
            
            this.http.post('http://localhost:8000/api/signup', {...this.form.value,profile:this.img_url})
      .subscribe(() => this.router.navigate(['/login']));
            alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.form.value, null, 4));
          }
          else
          {
            this.pass=true
            return
          }

  }


 


}
















