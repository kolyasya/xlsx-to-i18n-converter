import { difference } from 'lodash';

const logging = false;

const prepareTranslations = ({ translationsSheets = [], settings }) => {
  console.log('🇬🇧  Preparing translations...');

  const translations = {};

  if (translationsSheets?.length) {
    translationsSheets.forEach(sheet => {
      const sheetLanguages = sheet?.data?.[0]?.slice(1);

      const missingLanguages = difference(settings?.languages?.sort(), sheetLanguages?.sort());

      if (missingLanguages?.length) {
        console.error(`Sheet "${sheet?.name}" has missing langauges ${missingLanguages}`);
      }

      for (let column = 1; column < sheet?.data?.[0]?.length; column++) {
        const newFile = {};
        const languageCode = sheet?.data?.[0]?.[column];

        for (let row = 1; row < sheet?.data?.length; row++) {
          const key = sheet?.data?.[row]?.[0];
          const value = sheet?.data?.[row]?.[column];

          if (value === undefined || value === '') {
            console.error(
              `Missing value for ${languageCode.toUpperCase()} language, sheet: "${
                sheet?.name
              }", key: "${key}", value: "${value}"`,
            );
          }

          newFile[key] = value;
        }

        translations[`${languageCode}/${sheet?.name}.json`] = newFile;
      }
    });
  }

  logging && console.log('🇬🇧  prepareTranslations result:');
  logging && console.dir(translations, { depth: null });

  return translations;
};

export default prepareTranslations;
