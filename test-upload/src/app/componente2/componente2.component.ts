import { Component, OnInit } from '@angular/core';
import { logMethod } from '../app.decoradores';


@Component({
  selector: 'app-componente2',
  templateUrl: './componente2.component.html',
  styleUrls: ['./componente2.component.css']
})
export class Componente2Component implements OnInit {

  constructor() { }

  ngOnInit() {
    this.prueba(2,2,3);
  }
  
  @logMethod
  prueba(a: number, b: number, c: number) : number {
    return a+b+c;
  }
}
