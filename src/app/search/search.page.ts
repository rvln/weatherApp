import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

const API_URL = environment.API_URL;
const API_KEY = environment.API_KEY;

@Component({
  selector: 'app-search',
  templateUrl: 'search.page.html',
  styleUrls: ['search.page.scss'],
})
export class SearchPage {
  searchCity: string = '';
  weatherData: any;
  weatherIcon: string = '';

  constructor(private httpClient: HttpClient, private router: Router) { }

  searchWeather() {
    const requestUrl = `${API_URL}/weather?q=${this.searchCity}&appid=${API_KEY}`;

    this.httpClient.get(requestUrl).subscribe(
      (results: any) => {
        this.weatherData = results;
        this.weatherIcon = `https://openweathermap.org/img/wn/${results.weather[0].icon}@4x.png`;
      },
      error => {
        console.error('Error fetching weather data:', error);
      }
    );
  }
}
