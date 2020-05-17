import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CapteursComponent } from './capteurs/capteurs.component';
import { GraphComponent } from './graph/graph.component';
import { HttpClientModule }    from '@angular/common/http';
import { AdministrateurComponent } from './administrateur/administrateur.component';

@NgModule({
  declarations: [
    AppComponent,
    CapteursComponent,
    GraphComponent,
    AdministrateurComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
