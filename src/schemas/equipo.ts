import { Schema, model } from "mongoose";
import { Jugador } from "../classes/jugador";

const equipoSchema = new Schema (
    {
        _id: {
            type: Number,
            index: false
        },
        _tipoEquipo: {
            type: String
        },
        _nombre: {
            type: String,
            unique: true
        },
        _jugador: {
            type: Array,
            max: 22
        },
        _partidosJugados: {
            type: Number
        },
        _victorias: {
            type: Number
        },
        _derrotas: {
            type: Number
        },
        _puntos: {
            type: Number
        },
        _ganancias: {
            type: Number
        },
        _asciende: {
            type: Boolean
        },
        _aficionadosEsti: {
            type: Number
        }
    }
)

export type iEquipo = {
    _id: number | null,
    _tipoEquipo: string | null,
    _nombre: string | null,
    _jugador: Jugador[] | null,
    _partidosJugados: number | null,
    _victorias: number | null,
    _derrotas: number | null,
    _aficionadosEsti: number | null
}

export type iPrimera = {
    _id: number | null,
    _tipoEquipo: string | null,
    _nombre: string | null,
    _jugador: Jugador[] | null,
    _partidosJugados: number | null,
    _victorias: number | null,
    _derrotas: number | null,
    _aficionadosEsti: number | null,
    _puntos: number | null,
    _ganancias: number | null
}

export type iSegunda = {
    _id: number | null,
    _tipoEquipo: string | null,
    _nombre: string | null,
    _jugador: Jugador[] | null,
    _partidosJugados: number | null,
    _victorias: number | null,
    _derrotas: number | null,
    _aficionadosEsti: number | null,
    _puntos: number | null,
    _ganancias: number | null,
    _asciende: boolean | null
}

export type tEquipo = {
    _id: number,
    _tipoEquipo: string,
    _nombre: string,
    _jugador: Jugador[],
    _partidosJugados: number,
    _victorias: number,
    _derrotas: number,
    _aficionadosEsti: number,
    _puntos: number,
    _ganancias: number,
    _asciende: boolean
}


export const Equipos = model ("equipos", equipoSchema)