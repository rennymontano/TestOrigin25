import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MemoriaService } from '../../common/utils/memoriaService';
import { AppComponent } from '../../app.component';
import { Subscription } from 'rxjs';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-tarjeta',
  templateUrl: './tarjeta.component.html',
  styleUrls: ['./tarjeta.component.scss']
})
export class TarjetaComponent implements OnInit {
  suscribirAut: Subscription;
  configElementos = {placeholder: '0000-0000-0000-0000', maxLenght: '19', tipo: 'text', formato: true};
  constructor(private router: Router, private memoria: MemoriaService, parent: AppComponent, private appservice: AppService) {
    parent.showNav = false;
   }

  ngOnInit() {
    this.memoria.saveDataInMemory('autorizado', {showUser: false});
  }

  obtenerValor(event) {
    this.validarTarjetaTD(event);
  }

  validarTarjetaTD(nTarjeta) {

    //nTarjeta = '5236896523658569';
    this.suscribirAut = this.appservice.getVerificarTarjeta(nTarjeta).subscribe(next => {
      if (next.estado === 'TD_EXISTE') {
        this.memoria.saveDataInMemory('tarjeta', {idTarjeta: nTarjeta});
        this.router.navigate(['/autentificar']);
      } else {
        this.errorServicio('La tarjeta no existe o esta bloqueada');
      }
    },
    error => {
      this.errorServicio('Error con el servicio');
    }, () => {});

  }

  errorServicio(mensaje) {
    const data = {
      mensaje1: mensaje,
      ruta: 'tarjeta',
      icono: 'error'
    };
    this.memoria.saveDataInMemory('ErrorTarjeta', data);
    this.router.navigate(['/dialogo', 'ErrorTarjeta']);
  }

}
