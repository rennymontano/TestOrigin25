import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MemoriaService } from '../../common/utils/memoriaService';
import { AppComponent } from '../../app.component';
import { Subscription } from 'rxjs';
import { AppService } from '../../app.service';
import * as _moment from 'moment';

@Component({
  selector: 'app-retiro',
  templateUrl: './retiro.component.html',
  styleUrls: ['./retiro.component.scss']
})
export class RetiroComponent implements OnInit {

  suscribirAut: Subscription;
  movimiento: any;
  configElementos = {placeholder: '00.000.000,00', maxLenght: '20', tipo: 'text', formato: false};
  constructor(private router: Router, private memoria: MemoriaService, parent: AppComponent, private appservice: AppService) {
    parent.showNav = true;
  }

  ngOnInit() {

  }

  obtenerValor(event) {
    this.obtenerBalanceTarjeta(event);
  }

  obtenerBalanceTarjeta(monto) {
    const nTarjeta = this.memoria.getDataFromMemory('tarjeta').idTarjeta;
    this.suscribirAut = this.appservice.setRetiroTarjeta(nTarjeta, monto).subscribe(next => {
      const res = next;
      if (res.estado === '0') {
        this.movimiento = this.darFormato(res.data);
        this.memoria.saveDataInMemory('ticket', this.movimiento);
        this.router.navigate(['/ticket']);
      } else {
        this.errorServicio('No se pudorealizar la transacción');
      }
    },
    error => {
      this.errorServicio('Error con el servicio');
    }, () => {});

  }

  darFormato(datos): any {
    datos.idtarjeta = this.agregarFormatoTD(datos.idtarjeta);
    datos.fecha = this.getDateMMyyyy(datos.fecha);
    datos.monto = this.formatearMoneda(datos.monto);
    datos.noperacion = datos.noperacion.padStart(8, '0');

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
    const datePipe = _moment(fecha).format('DD/MM/YYYY');
    return datePipe;
  }

  formatearMoneda(monto): string {
    const abs = Math.abs(monto);
    return '$ ' + new Intl.NumberFormat('de-DE', {maximumFractionDigits: 2,
      minimumFractionDigits: 2 }).format(abs);
  }

  errorServicio(mensaje) {
    const data = {
      mensaje1: mensaje,
      ruta: 'retiro',
      icono: 'error'
    };
    this.memoria.saveDataInMemory('ErrorRetiro', data);
    this.router.navigate(['/dialogo', 'ErrorRetiro']);
  }
}
