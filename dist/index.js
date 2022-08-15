var $7jHWQ$lodash = require("lodash");
var $7jHWQ$nodexlsx = require("node-xlsx");
var $7jHWQ$fs = require("fs");

function $parcel$defineInteropFlag(a) {
  Object.defineProperty(a, '__esModule', {value: true, configurable: true});
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}

$parcel$defineInteropFlag(module.exports);

$parcel$export(module.exports, "default", () => $99faf78296dd76aa$export$2e2bcd8739ae039);

const $06175f48805edf1b$var$logging = false;
const $06175f48805edf1b$var$prepareTranslations = ({ translationsSheets: translationsSheets = [] , settings: settings  })=>{
    console.log("\uD83C\uDDEC\uD83C\uDDE7  Preparing translations...");
    const translations = {};
    if (translationsSheets?.length) translationsSheets.forEach((sheet)=>{
        const sheetLanguages = sheet?.data?.[0]?.slice(1);
        const missingLanguages = (0, $7jHWQ$lodash.difference)(settings?.languages?.sort(), sheetLanguages?.sort());
        if (missingLanguages?.length) console.error(`Sheet "${sheet?.name}" has missing langauges ${missingLanguages}`);
        for(let column = 1; column < sheet?.data?.[0]?.length; column++){
            const newFile = {};
            const languageCode = sheet?.data?.[0]?.[column];
            for(let row = 1; row < sheet?.data?.length; row++){
                const key = sheet?.data?.[row]?.[0];
                const value = sheet?.data?.[row]?.[column];
                if (value === undefined || value === "") console.error(`Missing value for ${languageCode.toUpperCase()} language, sheet: "${sheet?.name}", key: "${key}", value: "${value}"`);
                newFile[key] = value;
            }
            translations[`${languageCode}/${sheet?.name}.json`] = newFile;
        }
    });
    $06175f48805edf1b$var$logging && console.log("\uD83C\uDDEC\uD83C\uDDE7  prepareTranslations result:");
    $06175f48805edf1b$var$logging && console.dir(translations, {
        depth: null
    });
    return translations;
};
var $06175f48805edf1b$export$2e2bcd8739ae039 = $06175f48805edf1b$var$prepareTranslations;



const $da0fe823c64e5ab1$var$getTranslationsSettings = ({ settingsSheet: settingsSheet  })=>{
    console.log("\uD83C\uDDEC\uD83C\uDDE7  Reading settings sheet...");
    let result = {};
    if (settingsSheet?.data) result = settingsSheet?.data?.reduce((settingsResult, row)=>{
        if (row?.[0]) return {
            ...settingsResult,
            [row[0]]: row.slice(1)
        };
        else return settingsResult;
    }, {});
    return result;
};
var $da0fe823c64e5ab1$export$2e2bcd8739ae039 = $da0fe823c64e5ab1$var$getTranslationsSettings;


const $7f1f06d1300297bc$var$readTranslationsFile = ({ xlsxFilePath: xlsxFilePath = ""  })=>{
    console.log("\uD83C\uDDEC\uD83C\uDDE7  Reading translations file...");
    if (!xlsxFilePath) throw new Error(`xlsxFilePath is missing`);
    const workSheetsFromFile = (0, ($parcel$interopDefault($7jHWQ$nodexlsx))).parse(xlsxFilePath);
    let translationsSheets = workSheetsFromFile;
    let settings = {};
    if (workSheetsFromFile[0]?.name === "package_settings") {
        settings = (0, $da0fe823c64e5ab1$export$2e2bcd8739ae039)({
            settingsSheet: workSheetsFromFile[0]
        });
        // get all sheets except first one (settings one)
        translationsSheets = workSheetsFromFile.slice(1);
    }
    return {
        translationsSheets: translationsSheets,
        settings: settings
    };
};
var $7f1f06d1300297bc$export$2e2bcd8739ae039 = $7f1f06d1300297bc$var$readTranslationsFile;



const $d5442b0ad6a05851$var$saveTranslationsAsFiles = ({ translations: translations , pathToSave: pathToSave = `${process.cwd().split(".meteor")[0]}imports/internationalization/translations_test` , settings: settings = {} ,  })=>{
    const { languages: languages  } = settings;
    languages?.forEach((language)=>{
        const directoryPath = `${pathToSave}/${language}`;
        console.log("Making a dir:", directoryPath);
        try {
            (0, ($parcel$interopDefault($7jHWQ$fs))).mkdirSync(directoryPath, {
                recursive: true
            });
        } catch (error) {}
    });
    Object.keys(translations).forEach((filePath)=>{
        try {
            const content = JSON.stringify(translations[filePath], null, 2);
            const finalPath = `${pathToSave}/${filePath}`;
            console.log(finalPath, content);
            (0, ($parcel$interopDefault($7jHWQ$fs))).writeFileSync(finalPath, content);
        } catch (err) {
            console.error(err);
        }
    });
};
var $d5442b0ad6a05851$export$2e2bcd8739ae039 = $d5442b0ad6a05851$var$saveTranslationsAsFiles;


const $99faf78296dd76aa$var$internationalizationParser = ({ source: source , output: output  })=>{
    const { translationsSheets: translationsSheets , settings: settings  } = (0, $7f1f06d1300297bc$export$2e2bcd8739ae039)({
        xlsxFilePath: source
    });
    console.log("Translation settings:", settings);
    const translations = (0, $06175f48805edf1b$export$2e2bcd8739ae039)({
        translationsSheets: translationsSheets,
        settings: settings
    });
    (0, $d5442b0ad6a05851$export$2e2bcd8739ae039)({
        translations: translations,
        settings: settings,
        pathToSave: output
    });
};
var $99faf78296dd76aa$export$2e2bcd8739ae039 = $99faf78296dd76aa$var$internationalizationParser;


//# sourceMappingURL=index.js.map
