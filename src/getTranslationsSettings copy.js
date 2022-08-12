const getTranslationsSettings = ({ settingsSheet }) => {
  console.log('🇬🇧  Reading settings sheet...');

  let result = {};

  if (settingsSheet?.data) {
    result = settingsSheet?.data?.reduce((settingsResult, row) => {
      if (row?.[0]) {
        return {
          ...settingsResult,
          [row[0]]: row.slice(1),
        };
      } else {
        return settingsResult;
      }
    }, {});
  }

  return result;
};

export default getTranslationsSettings;
