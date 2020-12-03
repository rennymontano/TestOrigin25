import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TarjetaModel } from './Models/TarjetaBuscarModels';
import { AutentificarModel } from './Models/AutentificarModels';
import { TransaccionModel } from './Models/transaccionModules';


@Injectable({
  providedIn: 'root'
})
export class AppService {
  baseUrl = 'http://localhost:60947/api';

  constructor(private http: HttpClient) { }

  getVerificarTarjeta(idTarjeta: string): Observable<any> {

    const data = new TarjetaModel();
    data.nTarjeta = idTarjeta;

    return this.http.post(this.baseUrl + '/Tarjeta/buscartarjeta', data);
  }

  getVerificacionPIN(idTarjeta: string, pin: string): Observable<any> {
    const data = new AutentificarModel();
    data.nTarjeta = idTarjeta;
    data.pin = pin;

    return this.http.post(this.baseUrl + '/Tarjeta/verificarpin', data);
  }

  getBalanceTarjeta(idTarjeta: string): Observable<any> {

    const data = new TarjetaModel();
    data.nTarjeta = idTarjeta;

    return this.http.post(this.baseUrl + '/Tarjeta/obtenerBalance', data);
  }

  getMovimientosTarjeta(idTarjeta: string): Observable<any> {

    const data = new TarjetaModel();
    data.nTarjeta = idTarjeta;

    return this.http.post(this.baseUrl + '/Tarjeta/obtenerMovimiento', data);
  }

  setRetiroTarjeta(idTarjeta: string, monto: number): Observable<any> {

    const data = new TransaccionModel();
    data.monto = monto;
    data.nTarjeta = idTarjeta;

    return this.http.post(this.baseUrl + '/Tarjeta/realizarRetiro', data);
  }
}