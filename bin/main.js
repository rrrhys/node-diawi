#!/usr/bin/env node

var Diawi = require("../diawi.js");

var argv = require('yargs')
  .command(['upload <token> <ipa>', '$0'], 'Uploads an ipa to Diawi', (yargs) => {
      yargs.positional('token', {
        describe: 'The api token for Diawi',
        type: 'string'
      })
      .positional('ipa', {
        describe: 'The path to the ipa, apk, or zip to upload',
        type: 'string'
      })
      .option('password', {
        alias: 'p',
        describe: 'protect your app with a password: it will be required to access the installation page',
        type: 'string'
      })
      .option('comment', {
        alias: 'c',
        describe: 'additional information to your users on this build: the comment will be displayed on the installation page',
        type: 'string'
      }).
      option('find_by_udid', {
        alias: 'f',
        describe: 'allow users to find this build by udid (iOS only)',
        default: 0,
        type: 'number'
      });
  })
  .demandCommand()
  .help()
  .argv;

//console.log(argv);


var command = argv._[0] || "upload";

switch (command) {

  case 'upload':
    new Diawi({ token: argv.token, path: argv.ipa, password: argv.password, comment: argv.comment, find_by_udid: argv.find_by_udid })
      .on("complete", function(url) {
        console.log(url);
      })
      .on("error", function(error) {
        console.log("Failed: ", error);
        process.exit(1);
      });

      break

  default:
    console.log("Unknown command: ", command)
    break
}
