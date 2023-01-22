import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatosService {

  baseURL: string = "https://rickandmortyapi.com/api/character";
  constructor( private http: HttpClient) { 

  }
  getAllData(): Observable<any> {
    return this.http.get(this.baseURL)
  }
}
