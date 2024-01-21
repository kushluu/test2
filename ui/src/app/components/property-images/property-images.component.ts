import { Component, OnInit } from '@angular/core';
import { PropertydetailsService } from 'src/app/services/propertydetails.service';
import {HttpClient} from '@angular/common/http';
import { ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';

@Component({
  selector: 'app-property-images',
  templateUrl: './property-images.component.html',
  styleUrls: ['./property-images.component.css']
})
export class PropertyImagesComponent implements OnInit {
  img_url1:any;
  img_url2:any;
  img_url3:any;
  img_url4:any;
  img_url5:any;
  id:any;
  imges:any;
  constructor( private router: Router,private route: ActivatedRoute,private img:PropertydetailsService,private http:HttpClient) { }

  ngOnInit(): void {
    this.route.params.subscribe(params=> {
      this.id=params['id']

      this.http.get('http://localhost:8000/apiapp/imges/'+this.id).subscribe(
        (res:any)=>{
          this.imges=res
          this.img_url1=this.imges[0].img1
          this.img_url2=this.imges[0].img2
          this.img_url3=this.imges[0].img3
          this.img_url4=this.imges[0].img4
          this.img_url5=this.imges[0].img5

          console.log(res);
          
        }
      ) 
    });
  }
  onFileSelected1(event:any){
    this.img.upload_image(event.target.files[0]).subscribe(data=>{
        this.img_url1=data;
    })
  }
  onFileSelected2(event:any){
      this.img.upload_image(event.target.files[0]).subscribe(data=>{
          this.img_url2=data;
      })
    }
  onFileSelected3(event:any){
        this.img.upload_image(event.target.files[0]).subscribe(data=>{
            this.img_url3=data;
        })
      }
  onFileSelected4(event:any){
          this.img.upload_image(event.target.files[0]).subscribe(data=>{
              this.img_url4=data;
          })
        }
  onFileSelected5(event:any){
            this.img.upload_image(event.target.files[0]).subscribe(data=>{
                this.img_url5=data;
                console.log(data)
            })
          }

  submit(){
    let data={
      'img1':this.img_url1,
      'img2':this.img_url2,
      'img3':this.img_url3,
      'img4':this.img_url4,
      'img5':this.img_url5,
      'id':this.id
    }
    alert(JSON.stringify(data))
    this.http.post('http://127.0.0.1:8000/apiapp/uploadimages',data).subscribe(
      () => this.router.navigate(['info'])
    )
  }
}

         

