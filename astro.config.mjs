import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://kenshinkai.com.br',
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
  ],
});
