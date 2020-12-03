import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';
import { Subscription } from 'rxjs';
import { AppService } from '../../app.service';
import { MemoriaService } from '../../common/utils/memoriaService';
import * as _moment from 'moment';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.scss']
})
export class ReporteComponent implements OnInit {

  movimientos: any;
  suscribirAut: Subscription;
  constructor(private route: Router, parent: AppComponent, private appservice: AppService, private memoria: MemoriaService, 
    private router: Router) {
    parent.showNav = true;
  }

  ngOnInit() {
    this.obtenetMovimientos();
  }

  obtenetMovimientos() {

    const nTarjeta = this.memoria.getDataFromMemory('tarjeta').idTarjeta;
    this.suscribirAut = this.appservice.getMovimientosTarjeta(nTarjeta).subscribe(next => {
      const res = next;
      if (res.estado === '0') {
        this.movimientos = this.darFormato(res.data);
        this.router.navigate(['/reporte']);
      } else {
        this.errorServicio('No se encontraron Movimientos');
      }
    },
    error => {
      this.errorServicio('Error con el servicio');
    }, () => {});

  }

  darFormato(datos): any {
    datos.filter(x => {
      x.idtarjeta = this.agregarFormatoTD(x.idtarjeta);
      x.fecha = this.getDateMMyyyy(x.fecha);
      x.monto = this.formatearMoneda(x.monto);
      x.balance = this.formatearMoneda(x.balance);
    });

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
      ruta: 'tarjeta',
      icono: 'error'
    };
    this.memoria.saveDataInMemory('ErrorMovimientos', data);
    this.router.navigate(['/dialogo', 'ErrorMovimientos']);
  }

  enviarAceptar() {
    this.route.navigate(['inicio']);
  }

  enviarSalir() {
    this.route.navigate(['tarjeta']);
  }

}
