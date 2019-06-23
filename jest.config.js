module.exports = {
  "roots": [
    "./test"
  ],
  "transform": {
    "^.+\\.js|svelte?$": "babel-jest",
    "^.+\\.svelte?$": "./lib/svelte-jest.js"
  },
  "moduleFileExtensions": [
    "js",
    "svelte"
  ],
}