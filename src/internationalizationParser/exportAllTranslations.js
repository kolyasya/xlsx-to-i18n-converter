import fs from 'fs';
/**
 * Generate index.js file with all translations jsons files exports
 */

const DEFAULT_EXPORTS_FILE_NAME = 'index.js';

const exportAllTranslations = ({ path, settings }) => {
  const { languages } = settings;

  languages.forEach(language => {
    const filesPaths = [];
    const filesNames = [];

    const pathToCreate = `${path}/${language}/${DEFAULT_EXPORTS_FILE_NAME}`;

    fs.readdirSync(`${path}/${language}`).forEach(function (file) {
      const fileName = file.replace('.json', '');
      if (file?.indexOf('.json') > -1 && !filesNames?.includes(fileName)) {
        filesPaths.push(`import ${fileName} from './${file}';`);
        filesNames.push(fileName);
      }
    });
    const importsPart = filesPaths.join('\n');

    const exportsPart = `export default { ${filesNames?.join(', ')} }`;

    const content = `${importsPart}\n${exportsPart}`;

    console.log(`Create index.js: ${pathToCreate}`);

    fs.writeFileSync(pathToCreate, content);
  });
};

export default exportAllTranslations;
