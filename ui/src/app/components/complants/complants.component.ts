import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-complants',
  templateUrl: './complants.component.html',
  styleUrls: ['./complants.component.css']
})
export class ComplantsComponent implements OnInit {
  reports:any;
  reportType: any;
  complants:any;
  desiredArray: any[] = [];
  desiredArray2: any[] = [];



  constructor(private http:HttpClient ) { }
  name='ksdk'


  toggle(e: any){
    console.log(e.target.checked)
    this.complants=e.target.checked
  }

  ngOnInit(): void {
    this.http.get('http://localhost:8000/apiapp/getreports', {withCredentials: true}).subscribe(
      (res: any) => {
        this.reports=res[0]
        this.complants=res[1]


                let names = new Set()
                this.reports.map((ele: { property: { name: unknown; }; }) => names.add(ele.property.name))
                console.log(names)
                this.reportType =  Array.from(names)
                this.reportType.map((type: any) => {
                  let typeArray: any[] = []
                  this.reports.map((ele: { property: { name: any; }; }) => {
                    if(ele.property.name == type){
                      typeArray.push(ele)
                    }
                  })

                  this.desiredArray.push({type: type, typeArray: typeArray})
                  console.log(this.desiredArray);
                  
                })


                let ids=new Set()
                this.complants.map((ele: { reporter: { id: unknown; }; })=> ids.add(ele.reporter.id))
                console.log(ids);
                this.reportType=[]
                this.reportType =  Array.from(ids)
                this.reportType.map((type: any) => {
                  let typeArray: any[] = []
                  this.complants.map((ele: { reporter: { id: any; }; }) => {
                    if(ele.reporter.id == type){
                      typeArray.push(ele)
                    }
                  })

                  this.desiredArray2.push({type: type, typeArray: typeArray})
                  console.log(this.desiredArray2);
                  
                })


         
      },
  )}

  changename(name:any){
    this.name=name
  }
  

}
