import xlsx from 'node-xlsx';

import getTranslationsSettings from './getTranslationsSettings';

const readTranslationsFile = ({ xlsxFilePath = '' }) => {
  console.log('🇬🇧  Reading translations file...');

  if (!xlsxFilePath) {
    throw new Error(`xlsxFilePath is missing`);
  }

  const workSheetsFromFile = xlsx.parse(xlsxFilePath);
  let translationsSheets = workSheetsFromFile;
  let settings = {};

  if (workSheetsFromFile[0]?.name === 'package_settings') {
    settings = getTranslationsSettings({ settingsSheet: workSheetsFromFile[0] });
    // get all sheets except first one (settings one)
    translationsSheets = workSheetsFromFile.slice(1);
  }

  return {
    translationsSheets,
    settings,
  };
};

export default readTranslationsFile;
