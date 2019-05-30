import { NgModule } from '@angular/core';

import { FeatherModule } from 'angular-feather';
import { Camera, Heart, Github, Archive, Upload} from 'angular-feather/icons';

/* https://www.npmjs.com/package/angular-feather */
const icons = {
  Camera,
  Heart,
  Github,
  Archive,
  Upload
};

@NgModule({
  imports: [
    FeatherModule.pick(icons)
  ],
  exports: [
    FeatherModule
  ]
})
export class IconsModule { }


/*
en app.modules.ts importar

@NgModule({
  imports: [
    IconsModule
  ]
*/

/* iconsModule en xxx.component.css

.big {
  height: 50px;
  width: 50px;
}

.fill-red {
  fill: red;
}

.fill-green {
  fill: green;
  fill-opacity: .5;
}
/* fin iconsModule */

/* en component icons
export class ComponenteComponent implements OnInit {


  icons = [
    { name: 'camera', class: 'big' },
    { name: 'heart', class: 'big fill-red' },
    { name: 'github', class: 'big fill-green' },
  ];

  constructor() { }

  ngOnInit() {
  }

}

*/
