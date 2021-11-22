export class Jugador {
    private _id: number
    private _nombre: string
    private _alias: string
    private _nomEquipo: string
    private _numPartidos: number
    private _goles: number
    private _asistencias: number
    private _expulsiones: number
    protected _salarioInicial: number

    constructor (id:number, nombre:string, alias:string, nomEquipo:string, numPartidos:number, goles:number, 
        asistencias:number, expulsiones:number, salarioInicial:number) {
            this._id = id
            this._nombre = nombre
            this._alias = alias
            this._nomEquipo = nomEquipo
            this._numPartidos = numPartidos
            this._goles = goles
            this._asistencias = asistencias
            this._expulsiones = expulsiones
            this._salarioInicial = salarioInicial
        }

    get id() {
        return this._id
    }
    get nombre() {
        return this._nombre
    }
    get alias() {
        return this._alias
    }
    get nomEquipo() {
        return this._nomEquipo
    }
    get numPartidos() {
        return this._numPartidos
    }
    get goles() {
        return this._goles
    }
    get asistencias() {
        return this._asistencias
    }
    get expulsiones() {
        return this._expulsiones
    }
    get salarioInicial() {
        return this._salarioInicial
    }

    salarioFinal() {
        let salario: number
        salario = this._salarioInicial
        if (this._goles >= 12) {
            salario += 0.2 * salario
        } else {
            if (this._goles < 12) {
                salario += 0.1 * salario
            } else {
                if (this._numPartidos > 30) {
                    salario += 0.3 * salario
                } else {
                    if (this._expulsiones > 3) {
                        salario -= 0.15 * salario
                    } else {
                        if (this._expulsiones <= 3) {
                            salario -= 0.05 * salario
                        }
                    }
                }
            }
        }
        return salario
    }

    todo() {
        return `ID: ${this._id},
    Nombre: ${this._nombre},
    Alias: ${this._alias},
    Equipo: ${this._nomEquipo},
    Partidos: ${this._numPartidos},
    Goles: ${this._goles},
    Asistencias: ${this._asistencias},
    Expulsiones: ${this._expulsiones},
    Salario inicial: ${this._salarioInicial}`
    }
}