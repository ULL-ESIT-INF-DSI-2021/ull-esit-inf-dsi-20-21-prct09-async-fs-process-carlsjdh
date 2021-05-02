import * as fs from 'fs';
import * as yargs from 'yargs';
import * as rimraf from 'rimraf';
import * as fsExtra from 'fs-extra';

/**
 * Comando que permite verificar si es un
 * fichero o un directorio determinada ruta
 */
yargs.command({
  command: 'check',
  describe: 'check if it is a file or a directory',
  builder: {
    path: {
      describe: 'path',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.path === 'string') {
      fs.lstat(`${argv.path}`, (err, stats) => {
        if (err) {
          console.log('Error, path doesn´t exist');
        } else {
          if (stats.isFile()) {
            console.log(`${argv.path} is a File`);
          } else {
            console.log(`${argv.path} is a Directory`);
          }
        }
      });
    }
  },
});

/**
 * Comando que permite crear directorios
 */
yargs.command({
  command: 'mkdir',
  describe: 'add directory',
  builder: {
    path: {
      describe: 'path',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.path === 'string') {
      fs.mkdir(`${argv.path}`, {recursive: true}, (err) => {
        if (err) {
          console.log('Error during creating directory...');
        } else {
          console.log(`${argv.path} created`);
        }
      });
    }
  },
});

/**
 * Comando que permite listar los nombres
 * de ficheros de un directorio
 */
yargs.command({
  command: 'list',
  describe: 'list directory',
  builder: {
    path: {
      describe: 'path',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.path === 'string') {
      fs.readdir(`${argv.path}`, (err, files) => {
        if (err) {
          console.log(`Dir ${argv.path} doesn´t exit`);
        } else {
          console.log(`List of ${argv.path}:`);
          files.forEach((file) => {
            console.log(file);
          });
        }
      });
    }
  },
});

/**
 * Comando que nos permite
 * mira el contenido de un fichero
 */
yargs.command({
  command: 'cat',
  describe: 'show file',
  builder: {
    path: {
      describe: 'path',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.path === 'string') {
      fs.readFile(`${argv.path}`, (err, data) => {
        if (err) {
          console.log(`Can´t read First Note`);
        } else {
          console.log(data.toString());
        }
      });
    }
  },
});

/**
 * Comando que nos permite borrar
 * un fichero o directorio
 */
yargs.command({
  command: 'rm',
  describe: 'rm file or directory',
  builder: {
    path: {
      describe: 'path',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.path === 'string') {
      fs.lstat(`${argv.path}`, (err, stats) => {
        if (err) {
          console.log('Error, path doesn´t exist');
        } else {
          if (stats.isFile()) {
            fs.rm(`${argv.path}`, (err) => {
              if (err) {
                console.log(`Error deleting file`);
              } else {
                console.log(`Deleted file ${argv.path}`);
              }
            });
          } else {
            rimraf(`${argv.path}`, (err) => {
              if (err) {
                console.log(`Error directory file`);
              } else {
                console.log(`Deleted directory ${argv.path}`);
              }
            });
          }
        }
      });
    }
  },
});

/**
 * Comando que nos permite mover un fichero
 * o un directorio
 */
yargs.command({
  command: 'mv',
  describe: 'mv file or directory',
  builder: {
    oldPath: {
      describe: 'path',
      demandOption: true,
      type: 'string',
    },
    newPath: {
      describe: 'path',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.oldPath === 'string') {
      fsExtra.move(`${argv.oldPath}`, `${argv.newPath}`, (err) => {
        if (err) return console.error(err);
        console.log('Move success!');
      });
    }
  },
});

/**
 * Comando que permite copiar ficheros
 * o directorios
 */
yargs.command({
  command: 'cp',
  describe: 'cp file or directory',
  builder: {
    oldPath: {
      describe: 'path',
      demandOption: true,
      type: 'string',
    },
    newPath: {
      describe: 'path',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.oldPath === 'string') {
      fsExtra.copy(`${argv.oldPath}`, `${argv.newPath}`, (err) => {
        if (err) return console.error(err);
        console.log('Copy Success!');
      });
    }
  },
});


yargs.parse();
