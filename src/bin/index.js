#!/usr/bin/env node
import program from 'commander';

import { internationalizationParser, xlsxBuilder } from '../index';

program
  .command('convert')
  .option('-s, --source <source>', 'Path to XLSX document')
  .option('-o, --output <output>', 'Path to put JSON files')
  .action(options => {
    internationalizationParser(options);
  });

program
  .command('build-xlsx')
  .option('-s, --source <source>', 'Path to root translations folder')
  .option('-o, --output <output>', 'Path to put XLSX file')
  .action(options => {
    xlsxBuilder(options);
  });

program.parse(process.argv);
