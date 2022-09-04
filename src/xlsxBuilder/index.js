import { readdirSync, readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { uniq } from 'lodash';
import xlsx from 'node-xlsx';

const logging = true;

const getDirectories = source =>
  readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

const getFiles = source =>
  readdirSync(source, { withFileTypes: true })
    .filter(dirent => !dirent.isDirectory())
    .map(dirent => dirent.name)
    .filter(filename => filename.includes('.json'));

const xlsxBuilder = ({ ...options }) => {
  const { source, output } = options;

  logging && console.log('XLSX Builder', options);

  const languages = getDirectories(source);

  const allFilenames = [];

  languages?.map(language => {
    allFilenames.push(...getFiles(path.join(source, language)));
  });

  logging && console.log({ allFilenames });

  const sheetNames = uniq(allFilenames)?.map(filename => path.basename(filename, '.json'));

  logging && console.log({ sheetNames });

  const sheetsData = sheetNames?.map(sheetName => {
    const sheetKeys = [];

    languages?.map(language => {
      const pathToFile = path.join(source, language, sheetName + '.json');
      const fileContent = JSON.parse(readFileSync(pathToFile));

      Object.keys(fileContent)?.map(translationKey => {
        sheetKeys.push(translationKey);
      });

      // console.dir(fileContent, { depth: null });

      // Object.keys(fileContent)?.map(translationKey => {
      //   sheetValues[translationKey] = {
      //     ...sheetValues[translationKey],
      //     [language]: fileContent[translationKey],
      //   };
      // });
    });

    const uniqSheetKeys = uniq(sheetKeys);

    const sheetRows = [
      ['languages', ...languages],
      ...uniqSheetKeys.map(translationKey => {
        const row = [translationKey];

        languages?.map(language => {
          const pathToFile = path.join(source, language, sheetName + '.json');
          const fileContent = JSON.parse(readFileSync(pathToFile));
          const keyValue = fileContent[translationKey] || '';

          row.push(keyValue);
        });

        return row;
      }),
    ];

    logging && console.log(`Sheet: ${sheetName}`);
    logging && console.table(sheetRows);

    return {
      name: sheetName,
      data: sheetRows,
    };
  });

  const finalData = [
    {
      name: 'package_settings',
      data: [['languages', ...languages]],
    },
    ...sheetsData,
  ];

  const finalDataWithAdjustedWidths = finalData?.map(sheet => ({
    ...sheet,
    options: {
      '!cols': sheet?.data?.[0]?.map(cell => ({ wpx: 200 })),
    },
  }));
  const xlsxBuffer = xlsx.build(finalDataWithAdjustedWidths);

  writeFileSync(output, xlsxBuffer);
};

export default xlsxBuilder;
