import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChannelsService {

  constructor(private http: HttpClient) { }
  getChannels(search: string){
    return this.http.post('http://localhost:8080',{ se: search, mode: 'all'});
  }
  // tslint:disable-next-line:typedef
  serchChannels(search: string){
    return this.http.post('http://localhost:8080', { se: search, mode: 'all' });
  }
  getByType(search: string, category: string){
    return this.http.post('http://localhost:8080', { se: search, mode: 'category', category });
  }
  getByCountry(search: string, country: string){
    return this.http.post('http://localhost:8080', { se: search, mode: 'country', country });
  }
  async getByLanguage(search: string, lang: string){
    return this.http.post('http://localhost:8080', { se: search, mode: 'language', lang });
  }
}
