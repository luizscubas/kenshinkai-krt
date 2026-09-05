import test from 'node:test';
import assert from 'node:assert/strict';
import { siteConfig } from '../src/data/siteConfig.js';

test('siteConfig possui estritamente as 2 turmas oficiais com horários corretos', () => {
  assert.equal(siteConfig.classes.length, 2);

  const infantil = siteConfig.classes.find((c) => c.id === 'infantil');
  assert.ok(infantil, 'Turma infantil deve existir');
  assert.equal(infantil?.schedule, '18:00 às 20:00');

  const adulto = siteConfig.classes.find((c) => c.id === 'juvenil-adulto');
  assert.ok(adulto, 'Turma juvenil-adulto deve existir');
  assert.equal(adulto?.schedule, '20:00 às 22:00');
});

test('siteConfig contém contatos e dados do Karatê para Todos', () => {
  assert.ok(siteConfig.contact.whatsappNumber);
  assert.ok(siteConfig.socialProject.name === 'Karatê para Todos');
  assert.ok(siteConfig.socialProject.pixKey);
});
