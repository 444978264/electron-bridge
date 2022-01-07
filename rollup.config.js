import common from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import {terser} from 'rollup-plugin-terser';
import rpt2 from 'rollup-plugin-typescript2';

export default {
  input: {
    index: './src/ipc.main.ts',
    'index.browser': './src/ipc.renderer.ts',
    libs: './src/common/index.ts',
  },
  output: [
    {
      dir: 'dist',
      entryFileNames(chunkInfo) {
        if (chunkInfo.name === 'libs') {
          return '[name]/index.js';
        }
        return '[name].js';
      },
      format: 'cjs',
      name: 'version',
      plugins: [],
    },
    {
      dir: 'dist',
      entryFileNames(chunkInfo) {
        if (chunkInfo.name === 'libs') {
          return '[name]/index.mjs';
        }
        return '[name].mjs';
      },
      format: 'es',
      name: 'version',
      plugins: [],
    },
  ],
  plugins: [resolve(), common(), json(), rpt2(), terser()],
  external: ['rxjs'],
};
