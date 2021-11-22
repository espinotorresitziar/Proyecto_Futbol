import { leerTeclado } from '../views/entradaTeclado'


export const menu = async () => {
    let num: number
    console.log('\n')
    console.log('1.- Equipos')
    console.log('2.- Jugadores')
    console.log('0.- Salir')
    num = parseInt(await leerTeclado('¿Que desea gestionar?'))
    return num
}

export const menu2 = async () => {
    let num2: number
    console.log('\n')
    console.log('1.- Crear equipo')
    console.log('2.- Añadir jugadores')
    console.log('3.- Listar equipos')
    console.log('4.- Modificar equipo')
    console.log('5.- Eliminar equipo')
    console.log('6.- Ver información de un equipo')
    console.log('7.- Dinero total de pagos a jugadores')
    console.log('0.- Salir')
    console.log('\n')
    num2 = parseInt( await leerTeclado('Elija una opción: ') )
    return num2
}

export const menu3 = async () => {
    let num3: number
    console.log('\n')
    console.log('1.- Crear jugador')
    console.log('2.- Listar jugadores')
    console.log('3.- Modificar jugador')
    console.log('4.- Borrar jugador')
    console.log('5.- Ver información de un jugador')
    console.log('0.- Salir')
    console.log('\n')
    num3 = parseInt(await leerTeclado('Opción: '))
    return num3
}

export const menuEqui = async () => {
    let num4: number
    console.log('\n')
    console.log('1.- Equipo')
    console.log('2.- Equipo Primera')
    console.log('3.- Equipo Segunda')
    console.log('0.- Salir')
    num4 = parseInt(await leerTeclado('Opción: '))
    return num4
}

export const menuJu = async () => {
    let num5: number
    console.log('\n')
    console.log('1.- Jugador')
    console.log('2.- Jugador Internacional')
    console.log('0.- Salir')
    num5 = parseInt(await leerTeclado('Opción: '))
    return num5
}

export const menuClasi = async () => {
    let num6: number
    console.log('\n')
    console.log('1.- Equipo Primera')
    console.log('2.- Equipo Segunda')
    console.log('0.- Salir')
    num6 = parseInt(await leerTeclado('Opción: '))
    return num6
}