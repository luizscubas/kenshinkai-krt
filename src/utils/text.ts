/**
 * Formata texto para exibição com a tipografia Zenzai Itacha.
 * Remove acentos diacríticos e formata apenas a primeira letra em maiúscula,
 * mantendo as demais letras em minúsculo.
 */
export function toTitleDisplay(text: string): string {
  if (!text) return '';
  const clean = text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
  return clean.charAt(0).toUpperCase() + clean.slice(1).toLowerCase();
}
