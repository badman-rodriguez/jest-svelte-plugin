const compile = require('svelte/compiler');
const fs = require('fs');
let compileOptions = null;
const sveltePath = process.cwd().split('\\').join('/');

// Utils

// process.js
function processComponent(filename) {
  const options = Object.assign({
    filename,
    format: 'cjs',
    sveltePath
  }, compileOptions);

  const transformedResult = compile.compile(fs.readFileSync(filename, "utf-8"), options);


  return transformedResult;
};

console.log(processComponent('./app.svelte'))
