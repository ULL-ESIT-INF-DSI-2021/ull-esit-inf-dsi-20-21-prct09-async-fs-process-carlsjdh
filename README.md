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
| Call Stack |        | Call Stack |
|------------|        |------------|
|```anonymous()```|   |```anonymous()```|

## Ejercicio 2
## Ejercicio 3
## Ejercicio 4
# Conclusión
# Bibliografía
