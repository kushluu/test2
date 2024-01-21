import { Component, OnInit } from '@angular/core';
import {Emitters} from '../emitters/emitters';
import { HttpClient } from '@angular/common/http';
import {Chart,registerables} from 'chart.js'
Chart.register(...registerables)
@Component({
  selector: 'app-adminpannel',
  templateUrl: './adminpannel.component.html',
  styleUrls: ['./adminpannel.component.css']
})
export class AdminpannelComponent implements OnInit {
  user_id:any;
  authenticated = false;
  user :any
  myChart:any
  catdata:any
  cattypdata:any
  reportdata:any
  constructor(private http:HttpClient) { }

  ngOnInit(): void {




    this.http.get('http://localhost:8000/api/adminuser', {withCredentials: true}).subscribe(
      (res: any) => {
        this.user_id = res.id
        this.user=res
        Emitters.authEmitter.emit(true);

      },
      err => {
        this.user_id = 'You are not logged in';
        Emitters.authEmitter.emit(false);
      }
    );
    Emitters.authEmitter.subscribe(
      (auth: boolean) => {
        this.authenticated = auth;
      }
    );

    this.http.get('http://localhost:8000/apiapp/catagorygraph').subscribe(
      (res: any) => {
        console.log(res);
        
        this.catdata=res[0]
        this.cattypdata=res[1]
        this.renderchart1('pie');
        this.renderchart('bar');

        // doughnut  polarArea  radar

      })

      this.http.get('http://localhost:8000/apiapp/reportgraph').subscribe(
        (res: any) => {
          this.reportdata=res
          this.renderchart2('radar');
          // doughnut  polarArea  radar
          console.log(res);
          
  
        })
    

  }
  logout(): void {
    this.http.post('http://localhost:8000/api/logout', {}, {withCredentials: true})
      .subscribe(() => this.authenticated = false);
  }
  renderchart(type:any){

    const myChart = new Chart('mychart', {
      type: type,
      data: {
          labels: ['sell','rent','lease'],
          datasets: [{
              label: '',
              data:this.cattypdata,
              // data: [12, 19, 3, 5, 2, 3],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)'
                  

              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)'
                  

              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  });
  }


  renderchart1(type:any){

    const myChart = new Chart('chart', {
      type: type,
      data: {
          labels: ['Appartment', 'Independent House', 'Independent Floor', 'Duplex', 'Penthouse', 'Villa','Gated communities'],
          datasets: [{
              label: '# of Votes',
              data:this.catdata,
              // data: [12, 19, 3, 5, 2, 3],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                  'rgba(0, 0, 0, 0.2)'

              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                  'rgba(0, 0, 0, 1)'

              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  });
  }


  renderchart2(type:any){

    const myChart = new Chart('my', {
      type: type,
      data: {
          labels: ["fake images","already sold","ltication property","no property in destination","facilities mentioned are not available"],
          datasets: [{
              label: '',
              data:this.reportdata,
              // data: [12, 19, 3, 5, 2, 3],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'

              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'

              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  });
  }



}
