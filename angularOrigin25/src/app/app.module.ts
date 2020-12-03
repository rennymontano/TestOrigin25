import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AutenticarComponent } from './operaciones/autenticar/autenticar.component';

import { HttpClientModule } from '@angular/common/http';
import { TarjetaComponent } from './operaciones/tarjeta/tarjeta.component';
import { BalanceComponent } from './operaciones/balance/balance.component';
import { RetiroComponent } from './operaciones/retiro/retiro.component';
import { TecladoComponent } from './common/teclado/teclado.component';
import { DialogoComponent } from './common/dialogo/dialogo.component';
import { MemoriaService } from './common/utils/memoriaService';
import { TicketComponent } from './common/ticket/ticket.component';
import { ReporteComponent } from './operaciones/reporte/reporte.component';
import { InicioComponent } from './operaciones/inicio/inicio.component';



@NgModule({
  declarations: [
    AppComponent,
    AutenticarComponent,
    TarjetaComponent,
    BalanceComponent,
    RetiroComponent,
    DialogoComponent,
    TecladoComponent,
    TicketComponent,
    ReporteComponent,
    InicioComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [MemoriaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
