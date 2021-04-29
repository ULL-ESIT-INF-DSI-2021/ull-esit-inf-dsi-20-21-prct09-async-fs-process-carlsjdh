import * as chokidar from 'chokidar';
import {spawn} from 'child_process';


const watcher = chokidar.watch('helloworld.txt');


watcher.on('change', () => {
  const wc = spawn('wc', ['helloworld.txt']);

  let data = '';

  wc.stdout.once('data', (chunk) => data += chunk);

  wc.on('close', () => {
    const wcOutputAsArray = data.split(/\s+/);
    console.log(`File helloworld.txt has ${wcOutputAsArray[1]} lines`);
    console.log(`File helloworld.txt has ${wcOutputAsArray[2]} words`);
    console.log(`File helloworld.txt has ${wcOutputAsArray[3]} characters`);
  });
});

