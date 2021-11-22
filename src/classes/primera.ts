import { Equipo } from "./equipo";
import { Jugador } from "./jugador";

export class Primera extends Equipo{
    private _puntos: number
    private _ganancias: number

    constructor(id:number, nombre:string, partidosJugados:number, victorias:number, 
        derrotas:number, aficionados:number, puntos:number, ganancias:number) {
            super(id, nombre, partidosJugados, victorias, derrotas, aficionados)
            this._puntos = puntos
            this._ganancias = ganancias
        }
    
    get puntos() {
        return this._puntos
    }
    get ganancias() {
        return this._ganancias
    }
    get aficionadosEsti() {
        return this._aficionadosEsti
    }
    
    aficionados(): number {
        let aficionados: number
        aficionados = this.aficionadosEsti
        if (this._puntos > 50) {
            aficionados += 0.5 * aficionados
        } else {
            aficionados += 0.3 * aficionados
        }
        return aficionados
    }

    dinero() {
        let dinero: number
        dinero = this._ganancias
        
    }

    clasificacion() {
        let opuntos = new Array(this._puntos)
        let orden = opuntos.sort() 
        console.log (orden)
    }

    todo() {
        let resulPrim: string
        resulPrim = `${super.todo()}
    Puntos: ${this._puntos}
    Ganancias: ${this._ganancias}`
        return resulPrim
    }
}
