import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import { PropertydetailsService } from 'src/app/services/propertydetails.service';
import { Options, LabelType } from 'ng5-slider';
@Component({
  selector: 'app-allfilter',
  templateUrl: './allfilter.component.html',
  styleUrls: ['./allfilter.component.css']
})
export class AllfilterComponent implements OnInit {
  formData = new FormData();
  surveyForm!: FormGroup;
  submitted= false;
  property:any;
  lat:any;
  lng:any;
  minValue: number = 100;
  maxValue: number = 500000;
  key:any;
  options: Options = {
    floor: 0,
    ceil: 500000,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          this.minValue=value
          this.formData.append('min_rainge',this.minValue+'')
          return '<b>Min price:</b> Rs. ' + value;
        case LabelType.High:
          this.maxValue=value
          this.formData.append('max_rainge',this.maxValue+'')
          return '<b>Max price:</b> Rs. ' + value;
        default:
          return 'Rs. ' + value;
      }
    }
  };
  constructor( private formBuilder: FormBuilder,
    private http: HttpClient,
    private propertydetails:PropertydetailsService) { }

  ngOnInit(): void {

    
    this.getpropertydetails();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
        if (position) {
          
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          this.surveyForm = this.formBuilder.group({
          property_type: [''],
          bhk_type: [''],
          room_type: [''],
          aminities: [''],
          residence_type: [''],
          gender: [''],
          furnishing: [''],
          distance: [100000],
          long:this.lng,
          lat:this.lat
        });
      }},
      (error: GeolocationPositionError) => console.log(error));
    } else {
      alert("application is not supported by this browser change browser or try again later.");
    }
}

getpropertydetails(){
  this.propertydetails.GetPropertyDetails().subscribe((data: any) => {  
    this.property = data; 
  }); 
}

onSubmit() {
  this.submitted = true;
  this.property=[]
  Object.entries(this.surveyForm.value).forEach(
        ([key, value]: any[]) => {
          this.formData.set(key, value);
        })
        console.log(this.formData)
  this.http.post('http://localhost:8000/apiapp/filter', {...this.surveyForm.value,min_rainge:this.minValue,max_rainge:this.maxValue}).subscribe(
    (res: any) => {
      this.property=res
    }
  );
  alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.surveyForm.value, null, 4));

 }
 search(){
  this.http.post('http://localhost:8000/apiapp/search',{'key':this.key}).subscribe((prop:any)=>{
    this.property=[]
    this.property=prop

  })  
  }


}
