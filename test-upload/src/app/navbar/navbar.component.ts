import { Component, OnInit } from '@angular/core';
import { IconsModule } from '../icons/icons.module'



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  title = 'Navbar';

  constructor() { }

  ngOnInit() {
  }

}
