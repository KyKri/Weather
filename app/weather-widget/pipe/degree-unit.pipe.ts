import { Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'degreeUnit'
})
export class DegreeUnitPipe {
    transform(temp: number, degreeType: string){
        switch (degreeType){
            case "celsius":
                return (temp - 32) / 1.8
            default:
                return temp
        }
    }
}