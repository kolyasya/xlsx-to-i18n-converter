import program from 'commander';

import internationalizationParser from '../index';

console.log('RUNNING!');

program
  .command('convert')
  .option('-s, --source <source>', 'Path to XLSX document')
  .option('-o, --output <output>', 'Path to put JSON files')
  .action(options => {
    console.log('CONVERT FILES', options);

    internationalizationParser({ source: options?.source, output: options?.output });
  });

program.parse(process.argv);
