import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';
import { AppService } from '../../app.service';
import { Subscription } from 'rxjs';
import { MemoriaService } from '../../common/utils/memoriaService';
import * as _moment from 'moment';


@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})
export class BalanceComponent implements OnInit {
  suscribirAut: Subscription;
  balance: any;
  constructor(private route: Router, parent: AppComponent, private appservice: AppService, private memoria: MemoriaService,
    private router: Router) {
    parent.showNav = true;
  }

  ngOnInit() {
    this.obtenerBalanceTarjeta();
  }

  obtenerBalanceTarjeta() {

    const nTarjeta = this.memoria.getDataFromMemory('tarjeta').idTarjeta;
    this.suscribirAut = this.appservice.getBalanceTarjeta(nTarjeta).subscribe(next => {
      const res = next;
      if (res.estado === '0') {
        this.balance = this.darFormato(res.data[0]);
        this.router.navigate(['/balance']);
      } else {
        this.errorServicio('No se encontro balance para esta tarjeta', '');
      }
    },
    error => {
      this.errorServicio('Error con el servicio', '');
    }, () => {});

  }

  darFormato(datos): any {
    datos.idtarjeta = this.agregarFormatoTD(datos.idtarjeta);
    datos.fecha = this.getDateMMyyyy(datos.fecha);
    datos.monto = this.formatearMoneda(datos.monto);
    return datos;
  }

  agregarFormatoTD(text): string {
    text = text.replace(/\s/g, '').replace(/([0-9]{4})/g, '$1 ');
    if (text.substring(text.length - 1) === ' ') {
      text = text.slice(0, -1);
    }
    return text;
  }

  getDateMMyyyy(fecha) {
    const datePipe = _moment(fecha).format('MM/YY');
    return datePipe;
  }

  formatearMoneda(monto): string {
    const abs = Math.abs(monto);
    return '$ ' + new Intl.NumberFormat('de-DE', {maximumFractionDigits: 2,
      minimumFractionDigits: 2 }).format(abs);
  }

  enviarAceptar() {
    this.route.navigate(['inicio']);
  }

  enviarSalir() {
    this.route.navigate(['tarjeta']);
  }

  errorServicio(mensaje0, mensaje1) {
    const data = {
      mensaje1: mensaje0,
      mensaje2: mensaje1,
      ruta: 'balance',
      icono: 'error'
    };
    this.memoria.saveDataInMemory('ErrorBalance', data);
    this.router.navigate(['/dialogo', 'ErrorBalance']);
  }
}
