import test from 'node:test';
import assert from 'node:assert/strict';
import { buildWhatsAppUrl } from '../src/utils/whatsapp.js';

test('buildWhatsAppUrl formata número e codifica caracteres especiais', () => {
  const phone = '5511999998888';
  const message = 'Olá! Gostaria de agendar uma aula experimental.';
  const url = buildWhatsAppUrl(phone, message);
  
  assert.equal(
    url,
    'https://wa.me/5511999998888?text=Ol%C3%A1%21%20Gostaria%20de%20agendar%20uma%20aula%20experimental.'
  );
});

test('buildWhatsAppUrl remove caracteres não numéricos do telefone', () => {
  const phone = '+55 (11) 99999-8888';
  const message = 'Teste';
  const url = buildWhatsAppUrl(phone, message);
  
  assert.equal(url, 'https://wa.me/5511999998888?text=Teste');
});
