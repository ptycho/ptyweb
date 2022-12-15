import path from 'path';
import {defineConfig} from 'vite';
import fs from 'fs';
import {fileURLToPath, URL} from "url";

const dirname = fileURLToPath(new URL('.', import.meta.url));

const pkgJson = JSON.parse(fs.readFileSync(path.resolve(dirname, `./package.json`)))

export const externals = new Set([
  ...Object.keys(pkgJson.dependencies).filter(
    (dep) => dep !== 'react-keyed-flatten-children' // Fix https://github.com/silx-kit/h5web/issues/914
  ),
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
