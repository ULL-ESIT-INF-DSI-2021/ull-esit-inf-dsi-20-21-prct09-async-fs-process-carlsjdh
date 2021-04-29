import * as yargs from 'yargs';
import * as fs from 'fs';
import {constants} from 'fs';
import {spawn} from 'child_process';

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
    }
  },
});


yargs.parse();
