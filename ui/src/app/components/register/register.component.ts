// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators} from '@angular/forms';
// import {HttpClient} from '@angular/common/http';
// import {Router} from '@angular/router';
// import {Emitters} from '../emitters/emitters';
// import { PropertydetailsService } from 'src/app/services/propertydetails.service';
// import { faBahtSign } from '@fortawesome/free-solid-svg-icons';




// @Component({
//   selector: 'app-register',
//   templateUrl: './register.component.html',
//   styleUrls: ['./register.component.css']
// })
// export class RegisterComponent implements OnInit {
//   surveyForm!: FormGroup;
//   submitted= false;
//   authenticated = false;
//   id:any;
//   lat:any;
//   lng:any;
//   img_url:any;
//   formData = new FormData();
//   url:any;
//   apartment:boolean=false;
//   independent_house:boolean=false;
//   toppings = this.formBuilder.group({
  
//   });
//   constructor(
//     private formBuilder: FormBuilder,
//     private http: HttpClient,
//     private router: Router,
//     private img:PropertydetailsService) { 
//       this.url='../../../assets/no one.jpg';

//           this.http.get('http://localhost:8000/api/user', {withCredentials: true}).subscribe(
//             (res: any) => {
//               this.id = res.id;
//               Emitters.authEmitter.emit(true);
             
//             },
//             err => {
//               this.id = 'You are not logged in';
//               Emitters.authEmitter.emit(false);
      
//             }
//           );
      
//           Emitters.authEmitter.subscribe(
//             (auth: boolean) => {
//               this.authenticated = auth;
//             }
//           );
//           }
    
//           onFileSelected(event:any){
//             this.img.upload_image(event.target.files[0]).subscribe(data=>{
//                 this.img_url=data;
//                 this.url=data;
//                 console.log(data)
//             })

           
//           }
         
          
       
//     ngOnInit(){
      
   

//       if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
//           if (position) {
            
//             this.lat = position.coords.latitude;
//             this.lng = position.coords.longitude;
//             this.surveyForm = this.formBuilder.group({
//               name: ['',Validators.required],
//               description: ['',Validators.required],
//               adress: ['',Validators.required],
//               price: ['',Validators.required],
//               property_type: ['',Validators.required],
//               bhk_type: ['',Validators.required],
//               room_type: ['',Validators.required],
//               aminities: ['',Validators.required],
//               residence_type: ['',Validators.required],
//               gender: ['',Validators.required],
//               furnishing: ['',Validators.required],
//               image:[''],
//               long:this.lng,
//               lat:this.lat,
//               id:this.id 
//              });
//           }
//         },
//           (error: GeolocationPositionError) => console.log(error));
//       } else {
//         alert("application is not supported by this browser change browser or try again later.");
//       }

      
//      }  
//      get f() { return this.surveyForm.controls; }
 
//       onSubmit() {
//       this.submitted = true;
 
//             if (this.surveyForm.invalid) {
//                 return;
//             }
//       // Object.entries(this.surveyForm.value).forEach(
//       //   ([key, value]: any[]) => {
//       //     this.formData.set(key, value);
//       //   })
//       //   console.log(this.formData)
    
//       this.http.post('http://localhost:8000/apiapp/Register_Property', {...this.surveyForm.value,image:this.img_url,...this.toppings})
//       .subscribe(() => this.router.navigate(['/']));
//      alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.surveyForm.value, null, 4));
//      }

//      printVal(){
//       console.log(this.apartment);
//       console.log(this.independent_house);
      
      
      
//      }
 
// }

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Emitters} from '../emitters/emitters';
import { PropertydetailsService } from 'src/app/services/propertydetails.service';




@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  surveyForm!: FormGroup;
  submitted= false;
  authenticated = false;
  id:any;
  lat:any;
  lng:any;
  img_url:any;
  formData = new FormData();
  url:any;
  apartment:boolean=false;
  independent_house:boolean=false;
  toppings = this.formBuilder.group({
  
  });
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private img:PropertydetailsService) { 
      this.url='../../../assets/no one.jpg';

          this.http.get('http://localhost:8000/api/user', {withCredentials: true}).subscribe(
            (res: any) => {
              this.id = res.id;  
              console.log(this.id);
                          
              Emitters.authEmitter.emit(true);
             
            },
            err => {
              this.id = 'You are not logged in';
              Emitters.authEmitter.emit(false);
      
            }
          );
      
          Emitters.authEmitter.subscribe(
            (auth: boolean) => {
              this.authenticated = auth;
            }
          );
          }
    
          onFileSelected(event:any){
            this.img.upload_image(event.target.files[0]).subscribe(data=>{
                this.img_url=data;
                this.url=data;
                console.log(data)
            })

           
          }
         
          
       
    ngOnInit(){
      
   

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
          if (position) {
            
            this.lat = position.coords.latitude;
            this.lng = position.coords.longitude;
            this.surveyForm = this.formBuilder.group({
              name: ['',Validators.required],
              description: ['',Validators.required],
              adress: ['',Validators.required],
              price: ['',Validators.required],
              property_type: ['',Validators.required],
              bhk_type: ['',Validators.required],
              room_type: ['',Validators.required],
              aminities: ['',Validators.required],
              residence_type: ['',Validators.required],
              gender: ['',Validators.required],
              furnishing: ['',Validators.required],
              image:[''],
              long:this.lng,
              lat:this.lat,
              id:['']
             });
          }
        },
          (error: GeolocationPositionError) => console.log(error));
      } else {
        alert("application is not supported by this browser change browser or try again later.");
      }

      
     }  
     get f() { return this.surveyForm.controls; }
 
      onSubmit() {
      this.submitted = true;
 
            if (this.surveyForm.invalid) {
                return;
            }
      // Object.entries(this.surveyForm.value).forEach(
      //   ([key, value]: any[]) => {
      //     this.formData.set(key, value);
      //   })
      //   console.log(this.formData)
    
      this.http.post('http://localhost:8000/apiapp/new_Register_Property', {...this.surveyForm.value,image:this.img_url,...this.toppings,id:this.id})
      .subscribe(() => this.router.navigate(['/']));
     alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.surveyForm.value, null, 4));
     console.log(this.surveyForm.value);
     
     }

     printVal(){
      console.log(this.apartment);
      console.log(this.independent_house);
      
      
      
     }
 
}



