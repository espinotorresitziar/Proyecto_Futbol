import { Jugador } from "./jugador"
import { Internacional } from "./internacional"

export class Equipo {
    private _id: number
    private _nombre: string
    private _jugador: Array<Jugador>
    private _partidosJugados: number
    private _victorias: number
    private _derrotas: number
    protected _aficionadosEsti: number


    constructor(id:number, nombre:string, partidosJugados:number, victorias:number, derrotas:number, aficionadosEsti:number) {
        this._id = id
        this._nombre = nombre
        this._jugador = new Array<Jugador>()
        this._partidosJugados = partidosJugados
        this._victorias = victorias
        this._derrotas = derrotas
        this._aficionadosEsti = aficionadosEsti
    }

    get id() {
        return this._id
    }
    get nombre() {
        return this._nombre
    }
    get jugador() {
        return this._jugador
    }
    get partidosJugados() {
        return this._partidosJugados
    }
    get victorias() {
        return this._victorias
    }
    get derrotas() {
        return this._derrotas
    }
    get aficionadosEsti() {
        return this._aficionadosEsti
    }

    public addJugador(jugador: Jugador) {
        this._jugador.push(jugador)
    }

    public getJugador(index: number) {
        return this._jugador[index]
    }

    aficionados(): number {
        let aficionados: number
        aficionados = this.aficionadosEsti
        return aficionados
    }

    pagos() {
        let pago: number = 0

        for (let jugador of this._jugador) {
            pago += jugador.salarioFinal()
        }
        return pago
    }

    todo() {
        return `ID: ${this._id}
    Nombre: ${this._nombre}
    Jugadores: ${this._jugador}
    Partidos jugados: ${this._partidosJugados}
    Victorias: ${this._victorias}
    Derrotas: ${this._derrotas}
    Aficionados Estimados: ${this._aficionadosEsti}`
    }
}

