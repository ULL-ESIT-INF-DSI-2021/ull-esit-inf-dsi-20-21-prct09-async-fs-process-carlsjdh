import * as chokidar from 'chokidar';
import * as fs from 'fs';
import * as yargs from 'yargs';
import {constants} from 'fs';


yargs.command({
  command: 'watch',
  describe: 'Watch notes',
  builder: {
    user: {
      describe: 'user',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string') {
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
    }
  },
});


yargs.parse();

