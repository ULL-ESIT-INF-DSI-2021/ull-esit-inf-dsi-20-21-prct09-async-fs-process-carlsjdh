[![Coverage Status](https://coveralls.io/repos/github/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct09-async-fs-process-carlsjdh/badge.svg?branch=main)](https://coveralls.io/github/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct09-async-fs-process-carlsjdh?branch=main) [![Tests](https://github.com/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct09-async-fs-process-carlsjdh/actions/workflows/tests.yml/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct09-async-fs-process-carlsjdh/actions/workflows/tests.yml) [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ULL-ESIT-INF-DSI-2021_ull-esit-inf-dsi-20-21-prct09-async-fs-process-carlsjdh&metric=alert_status)](https://sonarcloud.io/dashboard?id=ULL-ESIT-INF-DSI-2021_ull-esit-inf-dsi-20-21-prct09-async-fs-process-carlsjdh)

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
| Call Stack  |   Web Api   | Queue  |  Console |   |
|---|---|---|---|---|
|  d | d  |  d |  d |   |
|   |   |   |   |   |
|   |   |   |   |   |
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


## Ejercicio 3
## Ejercicio 4
# Conclusión
# Bibliografía
