import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

const API_URL = environment.API_URL;
const API_KEY = environment.API_KEY;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  weatherTemp: any;
  todayDate = new Date();
  cityName: string = '';
  weatherIcon: string = '';

  constructor(public httpClient: HttpClient) {
    this.loadData("Manado", "SA", "ID");
  }

  loadData(city: string, state: string, country: string) {
    const requestUrl = `${API_URL}/weather?q=${city},${state},${country}&appid=${API_KEY}`;
    console.log('Request URL:', requestUrl);

    this.httpClient.get(requestUrl).subscribe(
      (results: any) => {
        console.log(results);
        this.cityName = results.name;
        this.weatherTemp = results.main;
        this.weatherIcon = `https://openweathermap.org/img/wn/${results.weather[0].icon}@4x.png`;
      },
      error => {
        console.error('Error fetching weather data:', error);
      }
    );
  }
}
