import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { MemoriaService } from '../../common/utils/memoriaService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  autorizado: any;
  constructor(parent: AppComponent, private memoria: MemoriaService, private route: Router) {
    parent.showNav = true;

  }

  ngOnInit() {

  }

}
