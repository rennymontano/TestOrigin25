import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MemoriaService } from '../utils/memoriaService';

@Component({
  selector: 'app-dialogo',
  templateUrl: './dialogo.component.html',
  styleUrls: ['./dialogo.component.scss']
})
export class DialogoComponent implements OnInit {

  imagen: string;
  error: string;
  mensajes: any;

  constructor(private memoria: MemoriaService, private routeAct: ActivatedRoute, private route: Router) {
    this.error = this.routeAct.snapshot.paramMap.get('proceso');
  }

  ngOnInit() {
    this.mensajes = this.memoria.getDataFromMemory(this.error);
    if ( this.mensajes.icono === 'warning' ) {
      this.imagen = 'assets/warning.png';
    } else {
      this.imagen = 'assets/error.png';
    }
  }

  regresar() {
    this.route.navigate([this.mensajes.ruta]);
  }
}
