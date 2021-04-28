import 'mocha';
import {expect} from 'chai';
import {suma} from '../src/ejercicio2/app';

describe(('Inital test'), () => {
  it(('Suma'), () => {
    expect(suma(1, 3)).to.be.equal(4);
  });
});
