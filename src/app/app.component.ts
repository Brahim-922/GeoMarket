import { Component, OnInit } from '@angular/core';

declare const L:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit
{
  title = 'GeoMarket';

  ngOnInit(){
      if(!navigator.geolocation){
        console.log('location is not supported'); 
      }
      
      navigator.geolocation.getCurrentPosition((position) =>{
        const coords = position.coords;
        console.log(
          `lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`
        );
        let mymap = L.map('map').setView([coords.latitude, coords.longitude], 13);
       let marker =  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(mymap);
      L.marker([position.coords.latitude, position.coords.longitude]).addTo(mymap)
    .bindPopup('Vous etes ici !')
    .openPopup();
      marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
      let popup = L.popup()
      
    .setLatLng([position.coords.latitude, position.coords.longitude])
    .setContent("I am a standalone popup.")
    .openOn(mymap);
      }); 
      this.watchPosition();
      
}
watchPosition(){
  let desLat = 0;
  let desLon = 0;
 let id = navigator.geolocation.watchPosition((position)=>{
    console.log(
      `lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`
    );
    if(position.coords.latitude === desLat){
      navigator.geolocation.clearWatch(id);
    }
  },(err)=>{
    console.log(err);
    
  },{
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  })
}
}