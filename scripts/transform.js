// scripts/transform.js
const {exec} = require('child_process');
const path = require('path');

const srcFile = path.resolve(__dirname, '../src/challenges/learning/index.js');
const destFile = path.resolve(__dirname, '../src/challenges/learning/checkio.ts');

exec(`npx babel ${srcFile} --out-file ${destFile} --extensions ".js"`, (err, stdout, stderr) => {
  if (err) {
    console.error(`Error: ${err}`);
    return;
  }
  console.log(`Transformed ${srcFile} to ${destFile}`);
  console.log(stdout);
  console.error(stderr);
});
