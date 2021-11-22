import { Equipo } from "./classes/equipo";
import { Jugador } from "./classes/jugador";
import { Primera } from "./classes/primera";
import { Segunda } from "./classes/segunda";
import { Internacional } from "./classes/internacional";
import { Equipos, iEquipo, iPrimera, iSegunda, tEquipo } from "./schemas/equipo";
import { Jugadores, iJugador, iInternacional, tJugador } from "./schemas/jugador";
import { menu, menu2, menu3, menuClasi, menuEqui, menuJu } from "./views/menu";
import { leerTeclado } from './views/entradaTeclado'
import { db } from "./database/database";

//let equipos: Array<Equipo> = new Array<Equipo>()

//let jugadores: Array<Jugador> = new Array<Jugador>()


let tmpEquipo: any //Equipo = new Equipo(0,"",0, 0, 0, 0)
let tmpJugador: any //Jugador = new Jugador("", "", "", 0, 0, 0, 0, 0)

const main = async () => {
    let num: number
    
    await setBD(true)
    do {
        num = await menu()

        switch(num) {
            case 1: //Equipos
                let num2: number
                do {
                    num2 = await menu2()

                    switch(num2) {
                        case 1: //Crear equipo
                            await nuevoEquipo()
                        break

                        case 2: //AñadirJugador
                            await añadirJugador()
                        break

                        case 3: //Listar equipos
                            await db.conectarBD()
                            let query: any = await Equipos.find({})
                            console.log(query)
                        break

                        case 4: //Modificar
                            await modiEquipo()
                        break

                        case 5: //Eliminar
                            await elimEquipo()
                        break

                        case 6: //Ver un equico
                            await buscEquipo()
                        break

                        case 7: //Dinero total
                            await dinEquipo()
                        break
                    } 
                } while (num2 != 0)
                break
            case 2: //Jugadores
                let num3: number
                do {
                    num3 = await menu3()

                    switch (num3) {
                        case 1: //Crear Jugador
                            await nuevoJugador()
                        break

                        case 2: //Listar jugadores
                            await db.conectarBD()
                            let query: any = await Jugadores.find({})
                            console.log(query)
                        break

                        case 3: //Modificar jugador
                            await modiJugador()
                        break

                        case 4: //Eliminar jugador
                            await elimJugador()
                        break

                        case 5: //Buscar jugador
                            await buscJugador()
                        break
                    } 
                } while (num3 != 0)
            }
    }    
    while (num != 0)
}

export const nuevoEquipo = async () => {
    let num4: number
    let id:number, nombre:string, partidosJugados:number, victorias:number, derrotas:number, aficionadosEsti:number, puntos:number, ganancias:number, asciende:boolean
    do {
        num4 = await menuEqui()
        switch(num4) {
            case 1:
                id = parseInt(await leerTeclado("Introduzca el ID del equipo"))
                nombre = await leerTeclado("Nombre del equipo")
                partidosJugados = parseInt(await leerTeclado("Número de partidos jugados"))
                victorias = parseInt(await leerTeclado("Número de victorias"))
                derrotas = parseInt(await leerTeclado("Número de derrotas"))
                aficionadosEsti = parseInt(await leerTeclado("Número estimado de aficionados del equipo"))
                tmpEquipo = new Equipo(id, nombre, partidosJugados, victorias, derrotas, aficionadosEsti)
            break

            case 2:
                id = parseInt(await leerTeclado("Introduzca el ID del equipo"))
                nombre = await leerTeclado("Nombre del equipo")
                partidosJugados = parseInt(await leerTeclado("Número de partidos jugados"))
                victorias = parseInt(await leerTeclado("Número de victorias"))
                derrotas = parseInt(await leerTeclado("Número de derrotas"))
                puntos = parseInt(await leerTeclado("Puntos del equipo"))
                ganancias = parseInt(await leerTeclado("Ganancias del equipo"))
                aficionadosEsti = parseInt(await leerTeclado("Número estimado de aficionados del equipo"))
                tmpEquipo = new Primera(id, nombre, partidosJugados, victorias, derrotas, aficionadosEsti, puntos, ganancias)
            break

            case 3:
                id = parseInt(await leerTeclado("Introduzca el ID del equipo"))
                nombre = await leerTeclado("Nombre del equipo")
                partidosJugados = parseInt(await leerTeclado("Número de partidos jugados"))
                victorias = parseInt(await leerTeclado("Número de victorias"))
                derrotas = parseInt(await leerTeclado("Número de derrotas"))
                puntos = parseInt(await leerTeclado("Puntos del equipo"))
                ganancias = parseInt(await leerTeclado("Ganancias del equipo"))
                asciende = Boolean(await leerTeclado("¿El equipo asciende?(True o False)"))
                aficionadosEsti = parseInt(await leerTeclado("Número estimado de aficionados del equipo"))
                tmpEquipo = new Segunda(id, nombre, partidosJugados, victorias, derrotas, aficionadosEsti, puntos, ganancias, asciende)
            break
        }
    } while(num4 != 0)

    let salvar = async () => {
        let oSchema: any
        let dSchemaEquipo: iEquipo = {
            _id: null,
            _tipoEquipo: null,
            _nombre: null,
            _jugador: null,
            _partidosJugados: null,
            _victorias: null,
            _derrotas: null,
            _aficionadosEsti: null
        }
        let dSchemaPrimera: iPrimera = {
            _id: null,
            _tipoEquipo: null,
            _nombre: null,
            _jugador: null,
            _partidosJugados: null,
            _victorias: null,
            _derrotas: null,
            _puntos: null,
            _ganancias: null,
            _aficionadosEsti: null
        }
        let dSchemaSegunda: iSegunda = {
            _id: null,
            _tipoEquipo: null,
            _nombre: null,
            _jugador: null,
            _partidosJugados: null,
            _victorias: null,
            _derrotas: null,
            _puntos: null,
            _ganancias: null,
            _asciende: null,
            _aficionadosEsti: null
        }
        await db.conectarBD()
        if (tmpEquipo instanceof Equipo) {
            dSchemaEquipo._id = tmpEquipo.id
            dSchemaEquipo._tipoEquipo = "Equipo"
            dSchemaEquipo._nombre = tmpEquipo.nombre
            dSchemaEquipo._partidosJugados = tmpEquipo.partidosJugados
            dSchemaEquipo._victorias = tmpEquipo.victorias
            dSchemaEquipo._derrotas = tmpEquipo.derrotas
            dSchemaEquipo._aficionadosEsti = tmpEquipo.aficionadosEsti
            oSchema = new Equipos(dSchemaEquipo)
        } else if (tmpEquipo instanceof Primera) {
                dSchemaPrimera._id = tmpEquipo.id
                dSchemaPrimera._tipoEquipo = "Primera"
                dSchemaPrimera._nombre = tmpEquipo.nombre
                dSchemaPrimera._partidosJugados = tmpEquipo.partidosJugados
                dSchemaPrimera._victorias = tmpEquipo.victorias
                dSchemaPrimera._derrotas = tmpEquipo.derrotas
                dSchemaPrimera._puntos = tmpEquipo.puntos
                dSchemaPrimera._ganancias = tmpEquipo.ganancias
                dSchemaPrimera._aficionadosEsti = tmpEquipo.aficionadosEsti
                oSchema = new Equipos(dSchemaPrimera)
            } else if (tmpEquipo instanceof Segunda) {
                    dSchemaSegunda._id = tmpEquipo.id
                    dSchemaSegunda._tipoEquipo = "Segunda"
                    dSchemaSegunda._nombre = tmpEquipo.nombre
                    dSchemaSegunda._partidosJugados = tmpEquipo.partidosJugados
                    dSchemaSegunda._victorias = tmpEquipo.victorias
                    dSchemaSegunda._derrotas = tmpEquipo.derrotas
                    dSchemaSegunda._puntos = tmpEquipo.puntos
                    dSchemaSegunda._ganancias = tmpEquipo.ganancias
                    dSchemaSegunda._asciende = tmpEquipo.asciende
                    dSchemaSegunda._aficionadosEsti = tmpEquipo.aficionadosEsti
                    oSchema = new Equipos(dSchemaSegunda)
            }
        await oSchema.save()
        await db.desconectarBD()
    }
    salvar()
}

export const nuevoJugador = async () => {
    let num5: number
    let id:number, nombre:string, alias:string, nomEquipo:string, numPartidos:number, goles:number, asistencias:number, expulsiones:number, salarioInicial:number, pais:string, europeo:boolean
    do {
        num5 = await menuJu()
        switch (num5) {
            case 1:
                id = parseInt(await leerTeclado("Introduzca el ID del jugador"))
                nombre = await leerTeclado("Introduzca el nombre del jugador: ")
                alias = await leerTeclado("Introduzca el alias del jugador: ")
                nomEquipo = await leerTeclado("Escriba el equipo del jugador: ")
                numPartidos = parseInt(await leerTeclado("Número de partidos jugados: "))
                goles = parseInt(await leerTeclado("Goles marcados: "))
                asistencias = parseInt(await leerTeclado("Número de asistencias: "))
                expulsiones = parseInt(await leerTeclado("Número de expulsiones: "))
                salarioInicial = parseInt(await leerTeclado("Salario inicial del jugador: "))
                tmpJugador = new Jugador(id, nombre, alias, nomEquipo, numPartidos, goles, asistencias, expulsiones, salarioInicial)
            break
            case 2:
                id = parseInt(await leerTeclado("Introduzca el ID del jugador"))
                nombre = await leerTeclado("Introduzca el nombre del jugador: ")
                alias = await leerTeclado("Introduzca el alias del jugador: ")
                nomEquipo = await leerTeclado("Escriba el equipo del jugador: ")
                numPartidos = parseInt(await leerTeclado("Número de partidos jugados: "))
                goles = parseInt(await leerTeclado("Goles marcados: "))
                asistencias = parseInt(await leerTeclado("Número de asistencias: "))
                expulsiones = parseInt(await leerTeclado("Número de expulsiones: "))
                europeo = Boolean(await leerTeclado("Jugador europeo: "))
                pais = await leerTeclado("Escriba el país del jugador")
                salarioInicial = parseInt(await leerTeclado("Salario inicial del jugador: "))
                tmpJugador = new Internacional(id, nombre, alias, nomEquipo, numPartidos, goles, asistencias, expulsiones, salarioInicial, europeo, pais)
            break
            }
    }while(num5 != 0)

    let salvar = async () => {
        let oSchema: any
        let dSchemaJugador: iJugador = {
            _id: null,
            _tipoJugador: null,
            _nombre: null,
            _alias: null,
            _nomEquipo: null,
            _numPartidos: null,
            _goles: null,
            _asistencias: null,
            _expulsiones: null,
            _salarioInicial: null
        }
        let dSchemaInter: iInternacional = {
            _id: null,
            _tipoJugador: null,
            _nombre: null,
            _alias: null,
            _nomEquipo: null,
            _numPartidos: null,
            _goles: null,
            _asistencias: null,
            _expulsiones: null,
            _europeo: null,
            _pais: null,
            _salarioInicial: null
        }
        await db.conectarBD()
        if (tmpJugador instanceof Jugador) {
            dSchemaJugador._id = tmpJugador.id
            dSchemaJugador._tipoJugador = "Español"
            dSchemaJugador._nombre = tmpJugador.nombre
            dSchemaJugador._alias = tmpJugador.alias
            dSchemaJugador._nomEquipo = tmpJugador.nomEquipo
            dSchemaJugador._numPartidos = tmpJugador.numPartidos
            dSchemaJugador._goles = tmpJugador.goles
            dSchemaJugador._asistencias = tmpJugador.asistencias
            dSchemaJugador._expulsiones = tmpJugador.expulsiones
            dSchemaJugador._salarioInicial = tmpJugador.salarioInicial
            oSchema = new Jugadores(dSchemaJugador)
        } else {
            if (tmpJugador instanceof Internacional) {
                dSchemaInter._id = tmpJugador.id
                dSchemaInter._tipoJugador = "Internacional"
                dSchemaInter._nombre = tmpJugador.nombre
                dSchemaInter._alias = tmpJugador.alias
                dSchemaInter._nomEquipo = tmpJugador.nomEquipo
                dSchemaInter._numPartidos = tmpJugador.numPartidos
                dSchemaInter._goles = tmpJugador.goles
                dSchemaInter._asistencias = tmpJugador.asistencias
                dSchemaInter._expulsiones = tmpJugador.expulsiones
                dSchemaInter._europeo = tmpJugador.europeo
                dSchemaInter._pais = tmpJugador.pais
                dSchemaInter._salarioInicial = tmpJugador.salarioInicial
                oSchema = new Jugadores(dSchemaInter)
            }
        }
        await oSchema.save()
        await db.desconectarBD()
    }
    salvar()
}

export const modiEquipo = async () => {
    let num4: number
    let id:number, nombre:string, partidosJugados:number, victorias:number, derrotas:number, aficionadosEsti:number, puntos:number, ganancias:number, asciende:boolean
    do {
        num4 = await menuEqui()
        switch(num4) {
            case 1:
                nombre = await leerTeclado("Nombre del equipo que desea modificar")
                id = parseInt(await leerTeclado("ID del equipo"))
                partidosJugados = parseInt(await leerTeclado("Número de partidos jugados"))
                victorias = parseInt(await leerTeclado("Número de victorias"))
                derrotas = parseInt(await leerTeclado("Número de derrotas"))
                aficionadosEsti = parseInt(await leerTeclado("Número estimado de aficionados del equipo"))
                tmpEquipo = new Equipo(id, nombre, partidosJugados, victorias, derrotas, aficionadosEsti)
                await db.conectarBD()
                await Equipos.findOneAndUpdate(
                    {
                        _nombre: nombre 
                    },
                    {
                        _id: id,
                        _nombre: nombre,
                        _partidosJugados: partidosJugados,
                        _victorias: victorias,
                        _derrotas: derrotas,
                        _aficionadosEsti: aficionadosEsti
                    },
                    {
                        runValidators: true
                    }
                )
                await db.desconectarBD()
            break

            case 2:
                nombre = await leerTeclado("Nombre del equipo que desea modificar")
                id = parseInt(await leerTeclado("ID del equipo"))
                partidosJugados = parseInt(await leerTeclado("Número de partidos jugados"))
                victorias = parseInt(await leerTeclado("Número de victorias"))
                derrotas = parseInt(await leerTeclado("Número de derrotas"))
                puntos = parseInt(await leerTeclado("Puntos del equipo"))
                ganancias = parseInt(await leerTeclado("Ganancias del equipo"))
                aficionadosEsti = parseInt(await leerTeclado("Número estimado de aficionados del equipo"))
                tmpEquipo = new Primera(id, nombre, partidosJugados, victorias, derrotas, aficionadosEsti, puntos, ganancias)
                await db.conectarBD()
                await Equipos.findOneAndUpdate(
                    {
                        _nombre: nombre
                    },
                    {
                        _id: id,
                        _nombre: nombre,
                        _partidosJugados: partidosJugados,
                        _victorias: victorias,
                        _derrotas: derrotas,
                        _puntos: puntos,
                        _ganancias: ganancias,
                        _aficionadosEsti: aficionadosEsti
                    },
                    {
                        runValidators: true
                    }
                )
                await db.desconectarBD()
            break

            case 3:
                nombre = await leerTeclado("Nombre del equipo que desea modificar")
                id = parseInt(await leerTeclado("ID del equipo"))
                partidosJugados = parseInt(await leerTeclado("Número de partidos jugados"))
                victorias = parseInt(await leerTeclado("Número de victorias"))
                derrotas = parseInt(await leerTeclado("Número de derrotas"))
                puntos = parseInt(await leerTeclado("Puntos del equipo"))
                ganancias = parseInt(await leerTeclado("Ganancias del equipo"))
                asciende = Boolean(await leerTeclado("¿El equipo asciende?(True o False)"))
                aficionadosEsti = parseInt(await leerTeclado("Número estimado de aficionados del equipo"))
                tmpEquipo = new Segunda(id, nombre, partidosJugados, victorias, derrotas, aficionadosEsti, puntos, ganancias, asciende)
                await db.conectarBD()
                await Equipos.findOneAndUpdate(
                    {
                        _nombre: nombre
                    },
                    {
                        _id: id,
                        _nombre: nombre,
                        _partidosJugados: partidosJugados,
                        _victorias: victorias,
                        _derrotas: derrotas,
                        _puntos: puntos,
                        _ganancias: ganancias,
                        _asciende: asciende,
                        _aficionadosEsti: aficionadosEsti
                    },
                    {
                        runValidators: true
                    }
                )
                await db.desconectarBD()
            break
        }
    } while(num4 != 0)
}

export const elimEquipo = async () => {
    /*let num4: number
    let elim = await leerTeclado("De que tipo es el equipo")
    do {
        num4 = await menuEqui()
        switch(num4) {
            case 1:
                let nombre: string
                nombre = await leerTeclado("Nombre del equipo que desea eliminar")
                
                await db.conectarBD()
                await Equipos.deleteOne(
                    {
                        _nombre: {$eq: nombre}
                    }
                )
                .then((doc: any) => {
                    if (doc == null) {
                        console.log ("No existe equipo con ese nombre")
                    } else {
                        console.log("Se ha eliminado correctamente")
                    }
                })
                .catch ((err: any) =>
                    console.log ("Error: " + err)
                )
            case 2:
                let nombre1: string
                nombre1 = await leerTeclado("Nombre del equipo que desea eliminar")
                
                await db.conectarBD()
                await Equipos.deleteOne(
                    {
                        _nombre: {$eq: nombre1}
                    }
                )
                .then((doc: any) => {
                    if (doc == null) {
                        console.log ("No existe equipo con ese nombre")
                    } else {
                        console.log("Se ha eliminado correctamente")
                    }
                })
                .catch ((err: any) =>
                    console.log ("Error: " + err)
                )
            case 3:
                let nombre2: string
                nombre2 = await leerTeclado("Nombre del equipo que desea eliminar")
                
                await db.conectarBD()
                await Equipos.deleteOne(
                    {
                        _nombre: {$eq: nombre2}
                    }
                )
                .then((doc: any) => {
                    if (doc == null) {
                        console.log ("No existe equipo con ese nombre")
                    } else {
                        console.log("Se ha eliminado correctamente")
                    }
                })
                .catch ((err: any) =>
                    console.log ("Error: " + err)
                )
        }
    }while(num4 != 0)*/
    let nombre: string
    nombre = await leerTeclado("Nombre del equipo que desea eliminar")
                
    await db.conectarBD()
    await Equipos.deleteOne(
        {
            _nombre: {$eq: nombre}
        }
    )
    .then((doc: any) => {
        if (doc == null) {
            console.log ("No existe equipo con ese nombre")
        } else {
            console.log("Se ha eliminado correctamente")
        }
        })
        .catch ((err: any) =>
            console.log ("Error: " + err)
        )
}

export const buscEquipo = async () => {
    let nombre: string
    nombre = await leerTeclado("Nombre del equipo que desea ver")

    await db.conectarBD()
    await Equipos.find(
        {
            _nombre: {$eq: nombre}
        }
    )
    .then((doc:any) => {
        if (doc==null) {
            console.log("No existe equipo con ese nombre")
        } else {
            console.log("El equipo es: ")
            unEquipo(doc)
        }
    })
    .catch((err:any) => 
        console.log("Error: " + err)
    )
    await db.desconectarBD()
}

export const unEquipo = async (doc:any) => {
    let tmpEquipo: Equipo
    let docEquipo: tEquipo
    for (docEquipo of doc) {
        if (docEquipo._tipoEquipo == "Equipo") {
            tmpEquipo = new Equipo(
                docEquipo._id, docEquipo._nombre, docEquipo._partidosJugados, docEquipo._victorias,
                docEquipo._derrotas, docEquipo._aficionadosEsti
            )
            console.log(tmpEquipo.todo())
            console.log(`Total aficionados: ${tmpEquipo.aficionados()}`)
        } else {
            if (docEquipo._tipoEquipo == "Primera") {
                tmpEquipo = new Primera(
                    docEquipo._id, docEquipo._nombre, docEquipo._partidosJugados, docEquipo._victorias,
                    docEquipo._derrotas, docEquipo._aficionadosEsti, docEquipo._puntos, docEquipo._ganancias
                )
                console.log(tmpEquipo.todo())
                console.log(`Total aficionados: ${tmpEquipo.aficionados()}`)
            } else {
                if (docEquipo._tipoEquipo == "Segunda") {
                    tmpEquipo = new Segunda(
                        docEquipo._id, docEquipo._nombre, docEquipo._partidosJugados, docEquipo._victorias,
                        docEquipo._derrotas, docEquipo._aficionadosEsti, docEquipo._puntos, docEquipo._ganancias,
                        docEquipo._asciende
                    )
                    console.log(tmpEquipo.todo())
                    console.log(`Total aficionados: ${tmpEquipo.aficionados()}`)
                }
            }
        }
    }
}

export const dinEquipo = async () => {
    let tmpEquipo: Equipo
    let docEquipo: tEquipo
    let doc:any
    await db.conectarBD()
    for (docEquipo of doc) {
        if (docEquipo._tipoEquipo == "Equipo") {
            tmpEquipo = new Equipo(
                docEquipo._id, docEquipo._nombre, docEquipo._partidosJugados, docEquipo._victorias,
                docEquipo._derrotas, docEquipo._aficionadosEsti
            )
            console.log(`Dinero para pagos: ${tmpEquipo.pagos()}`)
        } else {
            if (docEquipo._tipoEquipo == "Primera") {
                tmpEquipo = new Primera(
                    docEquipo._id, docEquipo._nombre, docEquipo._partidosJugados, docEquipo._victorias,
                    docEquipo._derrotas, docEquipo._aficionadosEsti, docEquipo._puntos, docEquipo._ganancias
                )
                console.log(`Dinero para pagos: ${tmpEquipo.pagos()}`)
            } else {
                if (docEquipo._tipoEquipo == "Segunda") {
                    tmpEquipo = new Segunda(
                        docEquipo._id, docEquipo._nombre, docEquipo._partidosJugados, docEquipo._victorias,
                        docEquipo._derrotas, docEquipo._aficionadosEsti, docEquipo._puntos, docEquipo._ganancias,
                        docEquipo._asciende
                    )
                    console.log(`Dinero para pagos: ${tmpEquipo.pagos()}`)
                }
            }
        }
    }
    await db.desconectarBD()
}

export const añadirJugador = async () => {
    let docEquipo: tEquipo
    let tmpEquipo: Equipo = new Equipo(0, "", 0, 0, 0, 0)
    let query2: any
    let docJugador: tJugador
    await db.conectarBD()
    let nombre = await leerTeclado("Nombre del equipo al que desea añadir jugadores")
    let query: any = await Equipos.find(
        {
            _nombre: nombre
        }
    )

    docEquipo = query

    if (docEquipo._tipoEquipo == "Equipo") {
        tmpEquipo = new Equipo(
            docEquipo._id, docEquipo._nombre, docEquipo._partidosJugados, docEquipo._victorias,
            docEquipo._derrotas, docEquipo._aficionadosEsti
        )
    } else {
        if (docEquipo._tipoEquipo == "Primera") {
            tmpEquipo = new Primera(
                docEquipo._id, docEquipo._nombre, docEquipo._partidosJugados, docEquipo._victorias,
                docEquipo._derrotas, docEquipo._aficionadosEsti, docEquipo._puntos, docEquipo._ganancias
            )
        } else {
            if (docEquipo._tipoEquipo == "Segunda") {
                tmpEquipo = new Segunda(
                    docEquipo._id, docEquipo._nombre, docEquipo._partidosJugados, docEquipo._victorias,
                    docEquipo._derrotas, docEquipo._aficionadosEsti, docEquipo._puntos, docEquipo._ganancias,
                    docEquipo._asciende
                )
            }
        }
    }

    query2 = await Jugadores.find(
        {
            _nomEquipo: docEquipo._nombre
        }
    )

    docJugador = query2

    if (docJugador._tipoJugador == "Español") {
        tmpJugador = new Jugador(
            docJugador._id, docJugador._nombre, docJugador._alias, docJugador._nomEquipo, docJugador._numPartidos, docJugador._goles,
            docJugador._asistencias, docJugador._expulsiones, docJugador._salarioInicial
        )
    } else {
        if (docJugador._tipoJugador == "Internacional") {
            tmpJugador = new Internacional(
                docJugador._id, docJugador._nombre, docJugador._alias, docJugador._nomEquipo, docJugador._numPartidos, docJugador._goles,
                docJugador._asistencias, docJugador._expulsiones, docJugador._salarioInicial, docJugador._europeo, docJugador._pais
            )
        }
    }
    tmpEquipo.addJugador(tmpJugador)

    await db.desconectarBD()
}

export const modiJugador = async () => {
    let num5: number
    let id:number, nombre:string, alias:string, nomEquipo:string, numPartidos:number, goles:number, asistencias:number, expulsiones:number, salarioInicial:number, pais:string, europeo:boolean
    do {
        num5 = await menuJu()
        switch (num5) {
            case 1:
                alias = await leerTeclado("alias del jugador que desea modificar")
                id = parseInt(await leerTeclado("Introduzca el ID del jugador"))
                nombre = await leerTeclado("Introduzca el nombre del jugador")
                nomEquipo = await leerTeclado("Escriba el equipo del jugador")
                numPartidos = parseInt(await leerTeclado("Número de partidos jugados"))
                goles = parseInt(await leerTeclado("Goles marcados"))
                asistencias = parseInt(await leerTeclado("Número de asistencias"))
                expulsiones = parseInt(await leerTeclado("Número de expulsiones"))
                salarioInicial = parseInt(await leerTeclado("Salario inicial del jugador"))
                tmpJugador = new Jugador(id, nombre, alias, nomEquipo, numPartidos, goles, asistencias, expulsiones, salarioInicial)

                await db.conectarBD()
                await Jugadores.findOneAndUpdate(
                    {
                        _alias: alias
                    },
                    {
                        _id: id,
                        _nombre: nombre,
                        _alias: alias,
                        _nomEquipo: nomEquipo,
                        _numPartidos: numPartidos,
                        _goles: goles,
                        _asistencias: asistencias,
                        _expulsiones: expulsiones,
                        _salarioInicial: salarioInicial
                    },
                    {
                        runValidators: true
                    }
                )
                await db.desconectarBD()
            break
            case 2:
                alias = await leerTeclado("Alias del jugador que desea modificar")
                id = parseInt(await leerTeclado("Introduzca el ID del jugador"))
                nombre = await leerTeclado("Introduzca el nombre del jugador")
                nomEquipo = await leerTeclado("Escriba el equipo del jugador")
                numPartidos = parseInt(await leerTeclado("Número de partidos jugados"))
                goles = parseInt(await leerTeclado("Goles marcados"))
                asistencias = parseInt(await leerTeclado("Número de asistencias"))
                expulsiones = parseInt(await leerTeclado("Número de expulsiones"))
                europeo = Boolean(await leerTeclado("Jugador europeo"))
                pais = await leerTeclado("Escriba el país del jugador")
                salarioInicial = parseInt(await leerTeclado("Salario inicial del jugador"))
                tmpJugador = new Internacional(id, nombre, alias, nomEquipo, numPartidos, goles, asistencias, expulsiones, salarioInicial, europeo, pais)
                
                await db.conectarBD()
                await Jugadores.findOneAndUpdate(
                    {
                        _alias: alias
                    },
                    {
                        _id: id,
                        _nombre: nombre,
                        _alias: alias,
                        _nomEquipo: nomEquipo,
                        _numPartidos: numPartidos,
                        _goles: goles,
                        _asistencias: asistencias,
                        _expulsiones: expulsiones,
                        _europeo: europeo,
                        _pais: pais,
                        _salarioInicial: salarioInicial
                    },
                    {
                        runValidators: true
                    }
                )
                await db.desconectarBD()
            break
            }
    }while(num5 != 0)
}

export const elimJugador = async () => {
    let alias: string
    alias = await leerTeclado("Alias del jugador que desea eliminar")
    await db.conectarBD()
    await Jugadores.deleteOne(
        {
            _alias: {$eq: alias}
        }
    )
    .then((doc: any) => {
        if (doc == null) {
            console.log ("No existe jugador con ese alias")
        } else {
            console.log("Se ha eliminado correctamente")
        }
        })
    .catch ((err: any) =>
        console.log ("Error: " + err)
    )
}

export const buscJugador = async () => {
    let alias: string
    alias = await leerTeclado("Alias del jugador que desea ver")

    await db.conectarBD()
    await Jugadores.find(
        {
            _alias: {$eq: alias}
        }
    )
    .then((doc:any) => {
        if (doc==null) {
            console.log("No existe jugador con ese alias")
        } else {
            console.log("El jugador es: ")
            unJugador(doc)
        }
    })
    .catch((err:any) => 
        console.log("Error: " + err)
    )
    await db.desconectarBD()
}

export const unJugador = async (doc:any) => {
    let tmpJugador: Jugador
    let docJugador: tJugador
    for (docJugador of doc) {
        if (docJugador._tipoJugador == "Español") {
            tmpJugador = new Jugador(
                docJugador._id, docJugador._nombre, docJugador._alias, docJugador._nomEquipo, docJugador._numPartidos, docJugador._goles,
                docJugador._asistencias, docJugador._expulsiones, docJugador._salarioInicial
            )
            console.log(tmpJugador.todo())
            console.log(`Salario Final: ${tmpJugador.salarioFinal()}`)
        } else {
            if (docJugador._tipoJugador == "Internacional") {
                tmpJugador = new Internacional(
                    docJugador._id, docJugador._nombre, docJugador._alias, docJugador._nomEquipo, docJugador._numPartidos, docJugador._goles,
                    docJugador._asistencias, docJugador._expulsiones, docJugador._salarioInicial, docJugador._europeo, docJugador._pais
                )
                console.log(tmpJugador.todo())
                console.log(`Salario Final: ${tmpJugador.salarioFinal()}`)
            } 
        }
    }
}

/*export const clasiEquipo = async () => {
    let num6: number
    do {
        num6 = await menuClasi()
        switch(num6) {
            case 1:
                let claPrim: tEquipo
                await db.conectarBD()
                .then((doc:any) => {
                    for (claPrim of doc) {
                        if (claPrim._tipoEquipo == "Primera"){
                            console.log(`Nombre: ${tmpEquipo.nombre}, Puntos: ${tmpEquipo.clasificacion()}`)
                        }
                    }
                })
            break

            case 2: 
                let claSeg: tEquipo
                await db.conectarBD()
                .then((doc:any) => {
                    for (claSeg of doc) {
                        if (claSeg._tipoEquipo == "Segunda"){
                            console.log(`Nombre: ${tmpEquipo.nombre}, Puntos: ${tmpEquipo.clasificacion()}`)
                        }
                    }
                })
            break
        }
    }while(num6 != 0)
}*/

const setBD = async (local: boolean) => {
    
    const bdLocal = 'futbol'
  
    const conexionLocal = `mongodb://localhost/${bdLocal}`
    if (local) {
        db.cadenaConexion = conexionLocal
    }else{
        const bdAtlas = 'futbol'
        const userAtlas = await leerTeclado('Usuario BD Atlas')
        const passAtlas = await leerTeclado('Password BD Atlas')
        const conexionAtlas =  
        `mongodb+srv://${userAtlas}:${passAtlas}@cluster0.2jene.mongodb.net/${bdAtlas}?retryWrites=true&w=majority`
        db.cadenaConexion = conexionAtlas
    }
  }

main()