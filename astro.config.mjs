import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://luizscubas.github.io',
  base: '/kenshinkai-krt',
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
  ],
});
