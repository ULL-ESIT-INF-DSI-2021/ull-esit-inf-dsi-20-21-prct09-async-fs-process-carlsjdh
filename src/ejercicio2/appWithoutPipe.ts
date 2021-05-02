import * as yargs from 'yargs';
import * as fs from 'fs';
import {constants} from 'fs';
import {spawn} from 'child_process';

/**
 * Comando get (Versión Pipe) que permite obtener información
 * de número de líneas, caracteres o palabras
 */
yargs.command({
  command: 'get',
  describe: 'Information file',
  builder: {
    file: {
      describe: 'file',
      demandOption: true,
      type: 'string',
    },
    option: {
      describe: 'Options command',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.file === 'string') {
      fs.access(argv.file, constants.F_OK, (err) => {
        if (err) {
          console.log(`File ${argv.file} does not exist`);
        } else {
          console.log(`Great! We can execute!`);

          const wc = spawn('wc', [`-${argv.option}`, `${argv.file}`]);
          let wcOutput = '';

          wc.stdout.on('data', (piece) => {
            wcOutput += piece;
          });

          wc.on('close', () => {
            const wcOutputArray = wcOutput.split(/\s+/);
            switch (argv.option) {
              case 'l':
                console.log(`${argv.file} has ${wcOutputArray[0]} lines`);
                break;
              case 'c':
                console.log(`${argv.file} has ${wcOutputArray[0]} characters`);
                break;

              case 'w':
                console.log(`${argv.file} has ${wcOutputArray[0]} words`);
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
    }
  },
});


yargs.parse();
