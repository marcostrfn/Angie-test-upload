# TestApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.9.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


## Instalar

Run `npm install`

## Instalar librerías necesarias para reconocimiento de imagenes

Run `npm i face-api.js`

Run `npm i canvas`

## Iconos de angular-feather

Generamos modulo para iconos `ng generate module icons`

En app.module.ts asegurarse que está añadido en imports numero módulo:

 `import { IconsModule } from './icons/icons.module';`
 
 `imports: [ ...,IconsModule],`
 
En icons.module.ts añadiremos los iconos que vayamos a usar:

`import { Camera, Heart, Github, Archive, Upload, Briefcase, Eye} from 'angular-feather/icons';`

En app.component.css podemos añadir estilos:

`.big { height: 50px; width: 50px; }`
`.fill-red {fill: red;}`
`.fill-green {fill: green;fill-opacity: .5;}`

Ver [angular-feather](https://www.npmjs.com/package/angular-feather)


.
