import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-componente1',
  templateUrl: './componente1.component.html',
  styleUrls: ['./componente1.component.css']
})
export class Componente1Component implements OnInit {


  icons = [
    { name: 'camera', class: 'big' },
    { name: 'heart', class: 'big fill-red' },
    { name: 'github', class: 'big fill-green' },
    { name: 'archive', class: 'big fill-green' },
  ];

  constructor() { }

  ngOnInit() {
  }

}
