import { Jugador } from "./jugador";

export class Internacional extends Jugador {
    _europeo: boolean
    _pais: string

    constructor(id:number, nombre:string, alias:string, nomEquipo:string, numPartidos:number, goles:number, 
        asistencias:number, expulsiones:number, salarioInicial:number, europeo:boolean, pais:string) {
            super(id, nombre, alias, nomEquipo, numPartidos, goles, asistencias, expulsiones, salarioInicial)
            this._europeo = europeo
            this._pais = pais
        }
    
        get europeo() {
            return this._europeo
        }
    get pais() {
        return this._pais
    }
    get salarioInicial() {
        return this._salarioInicial
    }

    salarioFinal() {
        let salarioI = super.salarioFinal()
        if (this._pais != "España" || "españa") {
            salarioI += 0.15 * salarioI
        } else {
            if (this._europeo != false) {
                salarioI += 0.3 * salarioI
            }
        }
        return salarioI
    }

    todo() {
        let resulInter: string
        resulInter = super.todo()
        return `País: ${this._pais},
    Europeo: ${this._europeo}`
    }
}
