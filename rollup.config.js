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

const PLUGINS = [
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
];

export default {
  input: {
    index: './src/main.ts',
    bridge: './src/bridge.ts',
  },
  output: {
    dir: OUTPUT_DIR,
    entryFileNames(chunkInfo) {
      return '[name].js';
    },
    chunkFileNames(chunkInfo) {
      return 'chunks/[name].js';
    },
    format: 'cjs',
  },
  plugins: PLUGINS,
};
