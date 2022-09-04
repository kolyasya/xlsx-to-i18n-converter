import fs from 'fs';

const saveTranslationsAsFiles = ({
  translations,
  pathToSave = `${process.cwd().split('.meteor')[0]}imports/internationalization/translations_test`,
  settings = {},
}) => {
  const { languages } = settings;

  languages?.forEach(language => {
    const directoryPath = `${pathToSave}/${language}`;
    console.log('Making a dir:', directoryPath);
    try {
      fs.mkdirSync(directoryPath, { recursive: true });
    } catch (error) {}
  });

  Object.keys(translations).forEach(filePath => {
    try {
      const content = JSON.stringify(translations[filePath], null, 2);
      const finalPath = `${pathToSave}/${filePath}`;
      console.log(finalPath, content);
      fs.writeFileSync(finalPath, content);
    } catch (err) {
      console.error(err);
    }
  });
};

export default saveTranslationsAsFiles;
