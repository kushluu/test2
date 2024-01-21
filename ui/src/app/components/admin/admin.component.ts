import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  form!: FormGroup;
  submitted=false

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email_id: '',
      password: ''
    });
  }

  submit(): void {
    setTimeout(() =>{
      this.submitted=true
    },3000);
    
    this.http.post('http://localhost:8000/api/adminlogin', this.form.getRawValue(), {
      withCredentials: true
    }).subscribe(() => this.router.navigate(['adminpannel']));
  }

}
