import { Component, OnInit } from '@angular/core';
import { MemoriaService } from '../utils/memoriaService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {

  movimiento: any;
  constructor(private memoria: MemoriaService, private router: Router) {

  }

  ngOnInit() {
    this.movimiento = this.memoria.getDataFromMemory('ticket');
  }

  enviarAceptar() {
    this.router.navigate(['/inicio']);
  }

}
