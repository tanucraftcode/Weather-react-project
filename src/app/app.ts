import { Component, signal } from '@angular/core';
import { Router  } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Injectable } from '@angular/core';
//import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [Router ,CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  protected readonly title = signal('weather-app');
    constructor(private http: HttpClient, private router:Router ) {}
   private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
  private apiKey = 'd7b950541d7264a3b3df80a8b6f2cbf7';
  city = 'mumbai'
  weatherData: any;
  error:any
   fetchWeather() {
    this.getWeather(this.city).subscribe({
      next: (data) => {
        this.weatherData = data;
        console.log(data);
         this.router.navigate(['/weather', this.city]);
      },
      error: (err) => {
        this.error = err.error
        console.error('Error:', err.error);
      }
    });
  }

  getWeather(city:any){

  let data =  this.http.get(
      `${this.apiUrl}?q=${city}&appid=${this.apiKey}&units=metric`
    );
    console.log(`data is ${JSON.stringify(data)}`);
    return data
    // if(!data){
    //   return {}
    // }

}
}
