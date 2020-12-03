import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MemoriaService } from '../../common/utils/memoriaService';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-autenticar',
  templateUrl: './autenticar.component.html',
  styleUrls: ['./autenticar.component.scss']
})
export class AutenticarComponent implements OnInit {

  suscribirAut: Subscription;
  configElementos = {placeholder: '', maxLenght: '19', tipo: 'password', formato: false};
  constructor(private router: Router, private memoria: MemoriaService, parent: AppComponent, private appservice: AppService) {
    parent.showNav = false;
   }

  ngOnInit() {

  }

  obtenerValor(event) {
    this.validarPIN(event);
  }

  validarPIN(pin) {

    const nTarjeta = this.memoria.getDataFromMemory('tarjeta').idTarjeta;
    this.suscribirAut = this.appservice.getVerificacionPIN(nTarjeta, pin).subscribe(next => {
      const res = next;
      if (res.estado === 'PIN_CORRECTO') {
        this.memoria.saveDataInMemory('autorizado', {showUser: true});
        this.router.navigate(['/inicio']);
      } else {
        this.errorServicio('Clave Incorrecta', 'Si excede los cuatro intentos, su tarjeta será bloqueada');
      }
    },
    error => {
      this.errorServicio('Error con el servicio', '');
    }, () => {});

  }

  errorServicio(mensaje0, mensaje1) {
    const data = {
      mensaje1: mensaje0,
      mensaje2: mensaje1,
      ruta: 'autentificar',
      icono: 'error'
    };
    this.memoria.saveDataInMemory('ErrorPIN', data);
    this.router.navigate(['/dialogo', 'ErrorPIN']);
  }
}
