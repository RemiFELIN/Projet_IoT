import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Capteur } from '../capteurs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetCapteursService {

  private capteurs = new Subject<Capteur[]>();

  constructor(private http: HttpClient) {
  }

  getCapteurs(): Observable<Capteur[]> {
    return this.capteurs.asObservable();
  }

  updateCapteurs(capteurs: Capteur[]): void {
    this.capteurs.next(capteurs);
  }

  async requestCapteurs() {
    const url: string = 'http://localhost:3000/listeCapteurs/U2FsdGVkX1+pBMjv9psDPLaiwCNQX0ROlSJB5r9KFn01pQIv9oXGENfE1+DDb7BhYT3FBQeYywcWjE0jZ5Z9KA==';
    this.http.get<Capteur[]>(url).subscribe(res => this.updateCapteurs(res))
    setInterval(() => {
      this.http.get<Capteur[]>(url).subscribe(res => this.updateCapteurs(res));
    }, 10000);
  }

  async requestCapteursFirst() {
    const url: string = 'http://localhost:3000/listeCapteurs/U2FsdGVkX1+pBMjv9psDPLaiwCNQX0ROlSJB5r9KFn01pQIv9oXGENfE1+DDb7BhYT3FBQeYywcWjE0jZ5Z9KA==';
    return this.http.get<Capteur[]>(url).toPromise();
  }

  checkIfExist(ip: string){
    const url: string = 'http://localhost:3000/exist/' + ip;
    return this.http.get<Capteur[]>(url).toPromise();
    }


  ajouter(mac: string) {
    const url: string ='http://localhost:3000/add/' + mac;
    this.http.get(url).subscribe(res => console.log(res));
  }


  supprimer(mac: string){
    const url: string ='http://localhost:3000/remove/' + mac;
    this.http.get(url).subscribe(res => console.log(res));

  }
}
