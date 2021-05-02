[![Coverage Status](https://coveralls.io/repos/github/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct09-async-fs-process-carlsjdh/badge.svg?branch=main)](https://coveralls.io/github/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct09-async-fs-process-carlsjdh?branch=main) [![Tests](https://github.com/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct09-async-fs-process-carlsjdh/actions/workflows/tests.yml/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct09-async-fs-process-carlsjdh/actions/workflows/tests.yml) [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ULL-ESIT-INF-DSI-2021_ull-esit-inf-dsi-20-21-prct09-async-fs-process-carlsjdh&metric=alert_status)](https://sonarcloud.io/dashboard?id=ULL-ESIT-INF-DSI-2021_ull-esit-inf-dsi-20-21-prct09-async-fs-process-carlsjdh)

[Volver a Github](https://github.com/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct09-async-fs-process-carlsjdh)  
[Volver al informe](https://ull-esit-inf-dsi-2021.github.io/ull-esit-inf-dsi-20-21-prct09-async-fs-process-carlsjdh/)  

<h1> P9 - Sistema de ficheros y creación de procesos en Node.js </h1>

__Autor:__ Carlos Javier Delgado Hernandez  
__Correo:__ alu0101016054@ull.edu.es

# Indice:
- [Indice:](#indice)
- [Introducción](#introducción)
- [Objetivos](#objetivos)
- [Ejercicios](#ejercicios)
  - [Ejercicio 1](#ejercicio-1)
  - [Ejercicio 2](#ejercicio-2)
  - [Ejercicio 3](#ejercicio-3)
  - [Ejercicio 4](#ejercicio-4)
- [Conclusión](#conclusión)
- [Bibliografía](#bibliografía)

# Introducción
En esta práctica se plantean una serie de ejercicios o retos a resolver haciendo uso de las APIs proporcionadas por Node.js para interactuar con el sistema de ficheros, así como para crear procesos.
# Objetivos
- Gestionar ficheros con NodeJs  
- Creación de procesos e interconexión entre ellos con NodeJS  

# Ejercicios  

## Ejercicio 1  

Considere el siguiente ejemplo de código fuente TypeScript que hace uso del módulo fs de Node.js:  

````typescript
import {access, constants, watch} from 'fs';

if (process.argv.length !== 3) {
  console.log('Please, specify a file');
} else {
  const filename = process.argv[2];

  access(filename, constants.F_OK, (err) => {
    if (err) {
      console.log(`File ${filename} does not exist`);
    } else {
      console.log(`Starting to watch file ${filename}`);

      const watcher = watch(process.argv[2]);

      watcher.on('change', () => {
        console.log(`File ${filename} has been modified somehow`);
      });

      console.log(`File ${filename} is no longer watched`);
    }
  });
}
````  

A continuación realizaremos una traza de ejecución del código anterior Teniendo en cuenta el `Call Stack`, la `Web Api` y la `Queue`. 

__Primer caso: No se introduce un fichero__  
Cuando al ejecutar el programa `process.argv.length` no es mayor que 3, eso quiere decir que no se ha especificado ningún argumento para poder establecer el fichero a observar.

Por tanto, el código se quedaría aquí:  

````typescript
console.log('Please, specify a file');
````  

E internamente quedaría así:  

| Call Stack  |   Web Api   | Queue  |  Console |   |  
|---|---|---|---|---|  
|  `annonymus()` | -  |  - | `Please, specify a file` |   |  

__Segundo caso: El programa funciona correctamente__  
Si se especifica el argumento que contendrá el fichero a observar entonces las líneas de código que se ejecutarán serán las siguientes:  
````typescript
  const filename = process.argv[2];

  access(filename, constants.F_OK, (err) => {
    if (err) {
      console.log(`File ${filename} does not exist`);
    } else {
      console.log(`Starting to watch file ${filename}`);

      const watcher = watch(process.argv[2]);

      watcher.on('change', () => {
        console.log(`File ${filename} has been modified somehow`);
      });

      console.log(`File ${filename} is no longer watched`);
    }
  });
````  
El método `access` se colocará en `Call Stack`.  

| Call Stack  |   Web Api   | Queue  |  Console |   |  
|---|---|---|---|---|  
|  `(err) => {}` |   |   |   |   |  
|  `access()` |   |   |   |   |  

Este al ser un método asíncrono se colocará posteriormente se colocará en `Web Api`.  

| Call Stack  |   Web Api   | Queue  |  Console |   |
|---|---|---|---|---|
|   | `(err) => {}`  |   |   |   |


Cuando `access` terminé su evento asíncrono (comprobar si existe el fichero) mandará el callback a la `Queue`.  

| Call Stack  |   Web Api   | Queue  |  Console |   |
|---|---|---|---|---|
|   |  | `(err) => {}`   |   |   |


Como la `Call Stack` se encuentra vacía los procesos de `Queue` pueden se introducidos y ejecutados en la `Call Stack`.  

Si obtuviesemos un `err`: 

| Call Stack  |   Web Api   | Queue  |  Console |   |
|---|---|---|---|---|
|  `(err) => {----}`  |  |    | `File ${filename} does not exist`  |   |


En caso contrario:  

Se muestra el mensaje de que está observando el fichero  

| Call Stack  |   Web Api   | Queue  |  Console |   |  
|---|---|---|---|---|  
|  `(err) => {----}`  |  |    | `Starting to watch file ${filename}`  |   |  
 

Creamos el `watcher` y activamos un evento para cuando detecte un cambio en el fichero que se quedará esperando en la `Web api` hasta detectar dicho evento y mandar la `Call Back` asociada.  

| Call Stack  |   Web Api   | Queue  |  Console |   |  
|---|---|---|---|---|  
|  `watcher.on('change', () => {})`  |  |    |  |   |  
|  `(err) => {----}` |   |   |   |   |  


| Call Stack  |   Web Api   | Queue  |  Console |   |  
|---|---|---|---|---|  
|   | `() => {} (change)`  |    |  |   |  
|  `(err) => {----}` |   |   |   |   |  
 

| Call Stack  |   Web Api   | Queue  |  Console |   |  
|---|---|---|---|---|  
|    | `() => {} (change)`  |    | `File ${filename} is no longer watched` |   |  
|  `(err) => {----}` |   |   |   |   |  

Ahora se quedará el evento esperando hasta producirse un cambio:  

| Call Stack  |   Web Api   | Queue  |  Console |   |  
|---|---|---|---|---|  
|    | `() => {} (change)`  |  | |   |  




Cuando se produce un cambio ocurre lo siguiente:  

| Call Stack  |   Web Api   | Queue  |  Console |   |  
|---|---|---|---|---|  
|  | `() => {} (change)`  | console.log(`File ${filename} has been modified somehow`) (Lanzado por el evento)   | |   |  


| Call Stack  |   Web Api   | Queue  |  Console |   |  
|---|---|---|---|---|  
|  | `() => {} (change)`  |   | `File ${filename} has been modified somehow` |   |  


Y así sucesivamente por cada cambio ya que el watch quedará bloquedo dentro del `Web api` por cada cambio enviando su `call back`. 

__¿Qué hace la función access? ¿Para qué sirve el objeto constants?__  
La función access nos permite obtener información de acceso sobre el fichero. El nivel de acceso que queremos saber se determina por la constante `constants` teniendo cuatro variantes:  
- `F_OK`: Comprueba si el fichero existe. Pero no comprueba sus permisos
- `R_OK`: Comprueba si el fichero puede ser leído
- `W_OK`: Comprueba si un fichero puede ser escrito
- `X_OK`: Comprueba si un fichero puede ser ejecutado  


## Ejercicio 2
En este ejercicio tendremos que desarrollar un programa que nos permita leer el número de líneas, caracteres y palabras. Utilzaremos el módulo de `yargs` para implementar dicho proposito. Este programa permitira mediante el comando `get` obtener la información previamente dicha además de un argumento `option` para establecer que información concretamente quiere el usuario. Se nos pide dos formas de hacerlo:  

- Utilizando el método `pipe`:  
  
````typescript
    fs.access(argv.file, constants.F_OK, (err) => {
      if (err) {
        console.log(`File ${argv.file} does not exist`);
      } else {
        console.log(`Great! We can execute!`);

        const cat = spawn(`cat`, [`${argv.file}`]);
        const wc = spawn('wc', [`-${argv.option}`]);
        let wcOutput = '';
        cat.stdout.pipe(wc.stdin);

        wc.stdout.on('data', (piece) => {
          wcOutput += piece;
        });

        wc.on('close', () => {
          switch (argv.option) {
            case 'l':
              console.log(
                  `${argv.file} has ${wcOutput.replace(`\n`, '')} lines`,
              );
              break;
            case 'c':
              console.log(
                  `${argv.file} has ${wcOutput.replace(`\n`, '')} characters`,
              );
              break;

            case 'w':
              console.log(
                  `${argv.file} has ${wcOutput.replace(`\n`, '')} words`,
              );
              break;

            default:
              console.log(
                  'Error, that option isnt´t available. Options = l , c , w',
              );
              break;
          }
        });
      }
    });
````  

Filtraremos los posibles errores de acceso al fichero mediante `fs.access`. Crearemos dos procesos:
- `cat`: Encargado de mostrar el contenido del fichero
- `wc`: Encargado de mostrar la información de número de líneas, palabras o caracteres. 
Ahora tan sólo sería necesario redirigir con un `pipe` la salida del `cat` al fichero hacia la entrada del proceso `wc`.  

````typescript
const cat = spawn(`cat`, [`${argv.file}`]);
const wc = spawn('wc', [`-${argv.option}`]);
let wcOutput = '';
cat.stdout.pipe(wc.stdin);
````

Ahora simplemente guardaremos la información wn wcOutput dentro del evento `data` del proceso `wc` 

````typescript
wc.stdout.on('data', (piece) => {
  wcOutput += piece;
});
````

Y finalmente, cuando el proceso termine filtraremos la información recogida según el paramatro especificado para mostrar:

````typescript
 wc.on('close', () => {
  switch (argv.option) {
    case 'l':
      console.log(
          `${argv.file} has ${wcOutput.replace(`\n`, '')} lines`,
      );
      break;
    case 'c':
      console.log(
          `${argv.file} has ${wcOutput.replace(`\n`, '')} characters`,
      );
      break;

    case 'w':
      console.log(
          `${argv.file} has ${wcOutput.replace(`\n`, '')} words`,
      );
      break;

    default:
      console.log(
          'Error, that option isnt´t available. Options = l , c , w',
      );
      break;
  }
````  
- Utilizando solamente procesos:  

El esquema sería repetir basicamente lo anterior con la pequeña modificación siguiente:  

````typescript
const wc = spawn('wc', [`-${argv.option}`, `${argv.file}`]);
let wcOutput = '';
````
Observamos como ahora `wc` es un único proceso y todo lo demás quedaría igual.  

## Ejercicio 3

Desarollar una aplicación usando el módulo `yargs` que nos permita notificar sobre modificaciones de las notas (respecto a la práctica 8) de cierto usuario concreto. Para ellos utilizaremos el módulo [`chokidar`](https://github.com/paulmillr/chokidar) que nos permitirá observar cambios de dicho directorio (Se ha sustituido por `Watchfile` de Node Js por presentar errores en duplicación de eventos en sistemas linux).  

Para observar las notas de un usuario utilizaremos el comando `watch` con el parametro `user` para especificar el usuario concreto que deseamos observar.  

````typescript
fs.access(`./notes/${argv.user}`, constants.F_OK, (err) => {
  if (err) {
    console.log(`Directory ${argv.user} does not exist`);
  } else {
    const watcher = chokidar.watch(`./notes/${argv.user}`);
    watcher.on('add', (file, _) => {
      if ( fs.existsSync(file)) {
        console.log(`${file} has been added!`);
      }
    });

    watcher.on('change', (file, _) => {
      if ( fs.existsSync(file)) {
        console.log(`${file} has been changed!`);
      }
    });

    watcher.on('unlink', (file) => {
      console.log(`${file} has been deleted!`);
    });
  }
});
````  

Nuevamente, utilizaremos `access` para verificar que el directorio existe. Posteriormente crearemos el `Watcher` hacia el directorio del usuario especificado en el argumento y filtraremos según los siguientes eventos que ocurran:
- `add`: Este evento se invoca cuando se agrega un nuevo fichero al directorio. Mostraremos el evento por consola de dicho evento

````typescript
watcher.on('add', (file, _) => {
  if ( fs.existsSync(file)) {
    console.log(`${file} has been added!`);
  }
});
````  

- `change`: Este evento se invoca cuando se agrega un nuevo fichero al directorio. Mostraremos el evento por consola de dicho evento.

````typescript
watcher.on('change', (file, _) => {
  if ( fs.existsSync(file)) {
    console.log(`${file} has been changed!`);
  }
});
````  

- `unlink`: Este evento se invoca cuando se elimina un fichero del directorio. Mostraremos el evento por consola de dicho evento.

````typescript
watcher.on('unlink', (file) => {
  console.log(`${file} has been deleted!`);
});
````  

__¿Cómo haría para mostrar, no solo el nombre, sino también el contenido del fichero, en el caso de que haya sido creado o modificado?__  
En el evento `change` y `add` del `watcher` leeríamos el fichero correspondiente que nos pasa por parametro utilizando el método `fs.readFile` que nos devuelve a su vez el contenido del fichero nuevo/modificado para mostrarlo por consola.


__¿Cómo haría para que no solo se observase el directorio de un único usuario sino todos los directorios correspondientes a los diferentes usuarios de la aplicación de notas?__  
Cambiar el ambito del parámetro a todo el fichero que contiene todas las notas de todos los usuarios para observar todos los cambios de dicho directorio.  

## Ejercicio 4
# Conclusión
# Bibliografía
