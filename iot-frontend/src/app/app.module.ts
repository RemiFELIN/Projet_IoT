import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CapteursComponent } from './capteurs/capteurs.component';
import { GraphSonComponent } from './graph-son/graph-son.component';
import { GraphMouvementComponent } from './graph-mouvement/graph-mouvement.component';
import { GraphGazComponent } from './graph-gaz/graph-gaz.component';

@NgModule({
  declarations: [
    AppComponent,
    CapteursComponent,
    GraphSonComponent,
    GraphMouvementComponent,
    GraphGazComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
