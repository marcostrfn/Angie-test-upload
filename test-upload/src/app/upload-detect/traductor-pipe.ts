import { Pipe, PipeTransform } from '@angular/core';

export interface Traducir {
    key: string;
    value: string;
}

@Pipe({ name: 'traductorPipe' })
export class TraductorPipe implements PipeTransform {

    private traducciones: Traducir[] = [
        { key: 'male', value: 'masculino' },
        { key: 'female', value: 'femenino' }
    ]

    constructor() { }

    transform(data): string {
        return data;
    }

    translate(data): string {
        const x = this.traducciones.filter(x => x.key == data);
        if (x.length == 0) {
            return data;
        } else {
            return x[0].value;
        }
    }
}
