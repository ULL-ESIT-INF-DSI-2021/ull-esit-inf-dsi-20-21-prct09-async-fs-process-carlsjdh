import 'mocha';
import {expect} from 'chai';
import {execSync} from 'child_process';

const test = (args :string) => {
  return execSync(`node dist/ejercicio2/appWithPipe.js get ${args}`).toString();
};

describe(('EJ2: CLI'), () => {
  it(('Muestra número de líneas'), () => {
    expect(test(`--file="helloworld.txt" --option="l"`)).to.equal(
        `Great! We can execute!\nhelloworld.txt has 2 lines\n`,
    );
  });
});
