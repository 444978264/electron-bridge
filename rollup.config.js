import common from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import peer from 'rollup-plugin-peer-deps-external';
import {terser} from 'rollup-plugin-terser';
import rpt2 from 'rollup-plugin-typescript2';

export default {
  input: {
    index: './src/ipc.main.ts',
    browser: './src/ipc.renderer.ts',
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
          return '[name]/index.esm.js';
        }
        return '[name].esm.js';
      },
      format: 'es',
      name: 'version',
      plugins: [],
    },
  ],
  plugins: [peer(), resolve(), common(), json(), rpt2(), terser()],
  external: ['rxjs'],
};
