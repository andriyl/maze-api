const { execSync } = require('child_process');

const { setup } = require('../src/configs');

const sequelize = `${__dirname}/../node_modules/.bin/sequelize`;
const mainSeeds = `${__dirname}/seeds/main`;

// Do not execute undo action in production
if (setup.executeSeeds) {
  console.log(execSync(`${sequelize} db:seed:undo:all`).toString());
  console.log(execSync(`${sequelize} db:seed:undo:all --seeders-path=${mainSeeds}`).toString());
}

// Always execSync main seeds
console.log(execSync(`${sequelize} db:seed:all --seeders-path=${mainSeeds}`).toString());

// Do not load test seeds to production database
if (setup.executeSeeds) {
  console.log(
    execSync(`${sequelize} db:seed:all`).toString()
  );
}
