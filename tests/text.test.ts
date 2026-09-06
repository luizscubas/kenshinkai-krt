import test from 'node:test';
import assert from 'node:assert/strict';
import { toTitleDisplay } from '../src/utils/text.js';

test('toTitleDisplay remove acentos e formata apenas primeira letra em maiúscula', () => {
  assert.equal(toTitleDisplay('Associação Karatê Kenshinkai'), 'Associacao karate kenshinkai');
  assert.equal(toTitleDisplay('Liderança e Experiência Técnica'), 'Lideranca e experiencia tecnica');
  assert.equal(toTitleDisplay('Localização & Contato'), 'Localizacao & contato');
  assert.equal(toTitleDisplay('Dojo Kun (Lema do Dojô)'), 'Dojo kun (lema do dojo)');
  assert.equal(toTitleDisplay(''), '');
});
