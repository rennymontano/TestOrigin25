import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AutenticarComponent } from 'src/app/operaciones/autenticar/autenticar.component';
import { TarjetaComponent } from './operaciones/tarjeta/tarjeta.component';
import { DialogoComponent } from './common/dialogo/dialogo.component';
import { BalanceComponent } from './operaciones/balance/balance.component';
import { RetiroComponent } from './operaciones/retiro/retiro.component';
import { TicketComponent } from './common/ticket/ticket.component';
import { ReporteComponent } from './operaciones/reporte/reporte.component';
import { InicioComponent } from './operaciones/inicio/inicio.component';

const routes: Routes = [
  {path: 'tarjeta', component: TarjetaComponent},
  {path: '', component: TarjetaComponent},
  {path: 'autentificar', component: AutenticarComponent},
  {path: 'dialogo/:proceso', component: DialogoComponent},
  {path: 'balance', component: BalanceComponent},
  {path: 'retiro', component: RetiroComponent},
  {path: 'ticket', component: TicketComponent},
  {path: 'reporte', component: ReporteComponent},
  {path: 'inicio', component: InicioComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
