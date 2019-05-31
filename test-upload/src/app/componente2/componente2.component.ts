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
    this.prueba(1,25,345);
    this.prueba2('pepe', 'luis');
  }
  
  @logMethod
  prueba(a: number, b: number, c: number) : number {
    return a+b+c;
  }

  @logMethod
  prueba2(a: string, b: string) : string {
    return "hola soy " + a + " y " + b;
  }


}
