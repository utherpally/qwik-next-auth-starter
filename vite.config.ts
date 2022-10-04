import { defineConfig } from 'vite';
import { loadEnv } from 'vite';
import { qwikVite } from '@builder.io/qwik/optimizer';
import { qwikCity } from '@builder.io/qwik-city/vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [qwikCity(), qwikVite(), tsconfigPaths()],
    define: {
      __NEXT_SECRET__: env.NEXTAUTH_SECRET,
      __NEXT_PUBLIC_URL__: env.NEXTAUTH_URL,
    }
  };
});
