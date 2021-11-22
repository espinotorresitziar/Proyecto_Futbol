import { Equipo } from "./equipo";
import { Jugador } from "./jugador";

export class Segunda extends Equipo{
    private _puntos: number
    private _ganancias: number
    private _asciende: boolean

    constructor(id:number, nombre:string, partidosJugados:number, victorias:number, 
        derrotas:number, aficionados:number, puntos:number, ganancias:number, asciende:boolean) {
            super(id, nombre, partidosJugados, victorias, derrotas, aficionados)
            this._puntos = puntos
            this._ganancias = ganancias
            this._asciende = asciende
        }
    
    get puntos() {
        return this._puntos
    }
    get ganancias() {
        return this._ganancias
    }
    get asciende() {
        return this._asciende
    }
    get aficionadosEsti() {
        return this._aficionadosEsti
    }

    aficionados(): number {
        let aficionados: number
        aficionados = this.aficionadosEsti
        if (this._puntos > 50) {
            aficionados += 0.3 * aficionados
        } else {
            aficionados += 0.1 * aficionados
        }
        return aficionados
    }

    clasificacion() {
        let opuntos = new Array(this._puntos)
        let orden = opuntos.sort() 
        console.log (orden)
    }

    todo() {
        let resulSeg: string
        resulSeg = `${super.todo()}
    Puntos: ${this._puntos}
    Ganancias: ${this._ganancias}
    Asciende: ${this._asciende}`
        return resulSeg
    }
}