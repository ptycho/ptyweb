import path from 'path';
import {defineConfig} from 'vite';
import fs from 'fs';
import {fileURLToPath, URL} from "url";

const dirname = fileURLToPath(new URL('.', import.meta.url));

const pkgJson = JSON.parse(fs.readFileSync(path.resolve(dirname, `./package.json`)))

export const externals = new Set([
  ...Object.keys(pkgJson.dependencies),
  ...Object.keys(pkgJson.peerDependencies),
]);

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve('src/index.ts'),
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'esm.js' : 'js'}`,
    },
    rollupOptions: {
      external: [...externals].map((dep) => new RegExp(`^${dep}($|\\/)`, 'u')), // e.g. externalize `react-icons/fi`
    },
    sourcemap: true
  }
});
