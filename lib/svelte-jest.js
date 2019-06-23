// custom-transformer.js
'use strict';

import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

const THIS_FILE = fs.readFileSync(__filename);
const {compile} = require('svelte/compiler');
const {transform} = require('@babel/core');
const fs = require('fs');

const createTransformer = function (options = {}) {
  options = {
    caller: {
      name: 'svelte-jest',
      supportStaticESM: false
    },
    compact: false,
    plugins: (options && options.plugins) || [],
    sourceMaps: 'both',
    ...options
  }

  return {
    canInstrument: true,
    getCacheKey: function(fileData, fileName, configString, {config = {}, instrument, rootDir}) {
      return crypto
        .createHash('md5')
        .update(THIS_FILE)
        .update('\0', 'utf8')
        .update(fileData)
        .update('\0', 'utf8')
        .update(path.relative(rootDir, fileName))
        .update('\0', 'utf8')
        .update(configString)
        .update('\0', 'utf8')
        .update(instrument ? 'instrument' : '')
        .update('\0', 'utf8')
        .update(process.env.NODE_ENV || '')
        .digest('hex');
    },
    process: function(src, filename, config, transformOptions) {
      const transformResult = compile(fs.readFileSync(filename, "utf-8"), {});

      if (transformResult) {
        const { js: { code, map } } = transformResult;
        if (typeof code === 'string') {
          console.log(code, 'code------');
          console.log(map, 'map------')
          return {code, map};
        }
      }

      return src;
    }
  }
}

const transformer = {
  ...createTransformer(),
  createTransformer
};

export default transformer;

