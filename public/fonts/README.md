# Tipografia Kenshinkai

Fontes locais configuradas no projeto:

- **Zenzai Itacha** (`zenzai-itacha.woff2`, `zenzai-itacha.ttf`): Utilizada em títulos (`h1`-`h6`) e cabeçalhos com estética marcial japonesa.
- **Panoragraf** (`panoragraf.woff2`, `panoragraf.ttf`): Utilizada no corpo de texto (`body`, parágrafos, labels) com alta legibilidade.

As fontes são carregadas com diretivas `@font-face` em `src/styles/global.css` com `font-display: swap` e fallbacks seguros para o sistema (`serif` para Zenzai Itacha e `system-ui, -apple-system, sans-serif` para Panoragraf).
