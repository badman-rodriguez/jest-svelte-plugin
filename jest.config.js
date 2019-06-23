module.exports = {
  "roots": [
    "./test/src"
  ],
  "transform": {
    "^.+\\.js|svelte?$": "babel-jest",
    "^.+\\.svelte?$": "svelte-jest"
  },
  "moduleFileExtensions": [
    "js",
    "svelte"
  ],
}