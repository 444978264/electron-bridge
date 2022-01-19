import common from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import path from 'path';
import copy from 'rollup-plugin-copy';
import peer from 'rollup-plugin-peer-deps-external';
import {terser} from 'rollup-plugin-terser';
import rpt2 from 'rollup-plugin-typescript2';

const SOURCE_DIR = path.resolve(__dirname);
const OUTPUT_DIR = path.resolve(__dirname, './dist');

export default {
  input: {
    index: './src/ipc.main.ts',
    browser: './src/ipc.renderer.ts',
  },
  output: [
    {
      dir: OUTPUT_DIR,
      entryFileNames(chunkInfo) {
        return '[format]/[name].js';
      },
      chunkFileNames(chunkInfo) {
        return '[format]/[name].js';
      },
      format: 'cjs',
      name: 'version',
      plugins: [],
    },
    {
      dir: OUTPUT_DIR,
      entryFileNames() {
        return '[format]/[name].js';
      },
      chunkFileNames(chunkInfo) {
        return '[format]/[name].js';
      },
      format: 'es',
      name: 'version',
      plugins: [],
    },
  ],
  plugins: [
    peer(),
    resolve(),
    common(),
    json(),
    rpt2(),
    terser(),
    copy({
      targets: [{src: `${SOURCE_DIR}/package.json`, dest: OUTPUT_DIR}],
      verbose: true,
    }),
  ],
};
