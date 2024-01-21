import { Component,AfterViewInit} from '@angular/core';
import { Input} from '@angular/core';
import * as L from 'leaflet';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  private map:any;
  @Input() data:any;
  lat:any;
  lng:any;
  blackIcon = L.icon({
    iconUrl: '../../../assets/pin.ico',
    iconSize:     [38, 95], 
    shadowSize:   [50, 64], 
    iconAnchor:   [22, 94], 
    shadowAnchor: [4, 62],  
    popupAnchor:  [-3, -76] 
});
  private initMap(): void {
    this.map = L.map('map', {
      center: [ 25.644800, 100.216721 ],
      zoom: 4
    });
    var greenIcon = L.icon({
      iconUrl: '../../../assets/fevicon (1).ico',
      iconSize:     [20, 50], 
      shadowSize:   [50, 64], 
      iconAnchor:   [22, 94], 
      shadowAnchor: [4, 62],  
      popupAnchor:  [-3, -76] 
  });
  setTimeout(() =>{
    var x=0;
    console.log(this.data);
    for( var d of this.data)
    {
      if (this.data.length==1){
        L.marker([d.lat,d.long], {icon: greenIcon}).addTo(this.map).bindPopup(d.name)
      }
      else{
        const str='http://localhost:4200/property/'+d.property.id
        L.marker([d.property.lat,d.property.long], {icon: greenIcon}).addTo(this.map).bindPopup(`<a style=text-decoration: none;' href=${str}>${d.property.name}</a>`);
      }
    x=x+1
    } 
  },1000);
    this.getLocation();
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    tiles.addTo(this.map);
  }
  constructor() {}
  ngAfterViewInit(): void {
    this.initMap(); 
  }
  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
        if (position) {
        L.marker([position.coords.latitude,position.coords.longitude], {icon:this.blackIcon}).addTo(this.map).bindPopup("you are here");
        }
      });
    }
  }
} 