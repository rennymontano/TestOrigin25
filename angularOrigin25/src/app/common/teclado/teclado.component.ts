import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-teclado',
  templateUrl: './teclado.component.html',
  styleUrls: ['./teclado.component.scss']
})
export class TecladoComponent implements OnInit {

  @Input() config: any;
  @Output() valorInput: EventEmitter<string> = new EventEmitter();
  texto = '';

  constructor() { }

  ngOnInit() {
  }

  obtenerTeclado(event, n) {
    if (this.texto.length < this.config.maxLenght) {
      this.texto = this.texto + n;
      if (this.config.formato) {
        this.agregarFormatoTD(this.texto);
      }
    }
  }

  agregarFormatoTD(text) {
    text = text.replace(/\-/g, '').replace(/([0-9]{4})/g, '$1-');
    if (text.substring(text.length - 1) === '-') {
      text = text.slice(0, -1);
    }
    this.texto = text;
  }

  limpiarInput() {
    this.texto = '';
  }

  enviarAceptar() {
    this.valorInput.emit(this.texto.replace(/\-/g, ''));
  }

}
