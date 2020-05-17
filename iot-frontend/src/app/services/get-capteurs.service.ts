import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Capteur } from '../capteurs';

@Injectable({
  providedIn: 'root'
})
export class GetCapteursService {

  private capteurs = new Subject<Capteur[]>();

  constructor() { 
  }

  getCapteurs(): Observable<Capteur[]>{
    return this.capteurs.asObservable();
  }

  updateCapteurs(capteurs: Capteur[]): void{
    this.capteurs.next(capteurs);
  }
  
}
