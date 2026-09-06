# Tipografia Kenshinkai

Fontes locais configuradas no projeto:

- **Zenzai Itacha** (`zenzai-itacha.woff2`, `zenzai-itacha.ttf`): Fonte autêntica caligráfica marcial japonesa de autoria de Maelle K. & Thomas Boucherie. Utilizada em títulos (`h1`-`h3`) e classes `.font-title`. Não possui diacríticos da língua portuguesa; títulos que a utilizam são padronizados em maiúsculas sem acentos (`toTitleDisplay`).
- **Panoragraf** (`panoragraf.woff2`, `panoragraf.ttf`): Utilizada no corpo de texto (`body`, parágrafos, labels, `h4`-`h6` e cards informativos) com alta legibilidade e suporte completo a acentos.

As fontes são carregadas com diretivas `@font-face` em `src/styles/global.css` com `font-display: swap` e fallbacks seguros para o sistema (`serif` para Zenzai Itacha e `system-ui, -apple-system, sans-serif` para Panoragraf).

