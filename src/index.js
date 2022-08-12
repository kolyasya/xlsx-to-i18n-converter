import prepareTranslations from './prepareTranslations';
import readTranslationsFile from './readTranslationsFile';
import saveTranslationsAsFiles from './saveTranslationsAsFiles';

const internationalizationParser = ({ source, output }) => {
  const { translationsSheets, settings } = readTranslationsFile({
    xlsxFilePath: source,
  });

  console.log('Translation settings:', settings);

  const translations = prepareTranslations({
    translationsSheets,
    settings,
  });

  saveTranslationsAsFiles({ translations, settings, pathToSave: output });
};

export default internationalizationParser;
