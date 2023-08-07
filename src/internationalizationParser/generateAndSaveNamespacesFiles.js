const generateAndSaveNamespacesFiles = ({ translationsSheets, settings }) => {
  const { languages } = settings;

  const sheetsNames = translationsSheets?.map(sheet => sheet?.name);

  console.log(sheetsNames, languages);

  console.log('Now need to build up namespace files here');

  return 'test';
};

export default generateAndSaveNamespacesFiles;
