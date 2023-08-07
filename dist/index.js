var $7jHWQ$lodash = require("lodash");
var $7jHWQ$nodexlsx = require("node-xlsx");
var $7jHWQ$fs = require("fs");
var $7jHWQ$path = require("path");

function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}

$parcel$export(module.exports, "internationalizationParser", () => $3c45bcc230241de4$export$2e2bcd8739ae039);
$parcel$export(module.exports, "xlsxBuilder", () => $c8d53969e53107c7$export$2e2bcd8739ae039);

const $9e996a7000e2d554$var$logging = false;
const $9e996a7000e2d554$var$prepareTranslations = ({ translationsSheets: translationsSheets = [] , settings: settings  })=>{
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
    $9e996a7000e2d554$var$logging && console.log("\uD83C\uDDEC\uD83C\uDDE7  prepareTranslations result:");
    $9e996a7000e2d554$var$logging && console.dir(translations, {
        depth: null
    });
    return translations;
};
var $9e996a7000e2d554$export$2e2bcd8739ae039 = $9e996a7000e2d554$var$prepareTranslations;



const $ba7dcf679dcacdbf$var$getTranslationsSettings = ({ settingsSheet: settingsSheet  })=>{
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
var $ba7dcf679dcacdbf$export$2e2bcd8739ae039 = $ba7dcf679dcacdbf$var$getTranslationsSettings;


const $5f897312276da1f0$var$readTranslationsFile = ({ xlsxFilePath: xlsxFilePath = ""  })=>{
    console.log("\uD83C\uDDEC\uD83C\uDDE7  Reading translations file...");
    if (!xlsxFilePath) throw new Error(`xlsxFilePath is missing`);
    const workSheetsFromFile = (0, ($parcel$interopDefault($7jHWQ$nodexlsx))).parse(xlsxFilePath);
    let translationsSheets = workSheetsFromFile;
    let settings = {};
    if (workSheetsFromFile[0]?.name === "package_settings") {
        settings = (0, $ba7dcf679dcacdbf$export$2e2bcd8739ae039)({
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
var $5f897312276da1f0$export$2e2bcd8739ae039 = $5f897312276da1f0$var$readTranslationsFile;



const $05557e2157678c98$var$saveTranslationsAsFiles = ({ translations: translations , pathToSave: pathToSave = `${process.cwd().split(".meteor")[0]}imports/internationalization/translations_test` , settings: settings = {} ,  })=>{
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
var $05557e2157678c98$export$2e2bcd8739ae039 = $05557e2157678c98$var$saveTranslationsAsFiles;


const $fa229bb05560748e$var$generateAndSaveNamespacesFiles = ({ translationsSheets: translationsSheets , settings: settings  })=>{
    const { languages: languages  } = settings;
    const sheetsNames = translationsSheets?.map((sheet)=>sheet?.name);
    console.log(sheetsNames, languages);
    console.log("Now need to build up namespace files here");
    return "test";
};
var $fa229bb05560748e$export$2e2bcd8739ae039 = $fa229bb05560748e$var$generateAndSaveNamespacesFiles;


const $3c45bcc230241de4$var$internationalizationParser = ({ source: source , output: output  })=>{
    const { translationsSheets: translationsSheets , settings: settings  } = (0, $5f897312276da1f0$export$2e2bcd8739ae039)({
        xlsxFilePath: source
    });
    console.log("Translation settings:", settings);
    const translations = (0, $9e996a7000e2d554$export$2e2bcd8739ae039)({
        translationsSheets: translationsSheets,
        settings: settings
    });
    (0, $05557e2157678c98$export$2e2bcd8739ae039)({
        translations: translations,
        settings: settings,
        pathToSave: output
    });
    (0, $fa229bb05560748e$export$2e2bcd8739ae039)({
        translationsSheets: translationsSheets,
        settings: settings
    });
};
var $3c45bcc230241de4$export$2e2bcd8739ae039 = $3c45bcc230241de4$var$internationalizationParser;






const $c8d53969e53107c7$var$logging = true;
const $c8d53969e53107c7$var$getDirectories = (source)=>(0, $7jHWQ$fs.readdirSync)(source, {
        withFileTypes: true
    }).filter((dirent)=>dirent.isDirectory()).map((dirent)=>dirent.name);
const $c8d53969e53107c7$var$getFiles = (source)=>(0, $7jHWQ$fs.readdirSync)(source, {
        withFileTypes: true
    }).filter((dirent)=>!dirent.isDirectory()).map((dirent)=>dirent.name).filter((filename)=>filename.includes(".json"));
const $c8d53969e53107c7$var$xlsxBuilder = ({ ...options })=>{
    const { source: source , output: output  } = options;
    $c8d53969e53107c7$var$logging && console.log("XLSX Builder", options);
    const languages = $c8d53969e53107c7$var$getDirectories(source);
    const allFilenames = [];
    languages?.map((language)=>{
        allFilenames.push(...$c8d53969e53107c7$var$getFiles((0, ($parcel$interopDefault($7jHWQ$path))).join(source, language)));
    });
    $c8d53969e53107c7$var$logging && console.log({
        allFilenames: allFilenames
    });
    const sheetNames = (0, $7jHWQ$lodash.uniq)(allFilenames)?.map((filename)=>(0, ($parcel$interopDefault($7jHWQ$path))).basename(filename, ".json"));
    $c8d53969e53107c7$var$logging && console.log({
        sheetNames: sheetNames
    });
    const sheetsData = sheetNames?.map((sheetName)=>{
        const sheetKeys = [];
        languages?.map((language)=>{
            const pathToFile = (0, ($parcel$interopDefault($7jHWQ$path))).join(source, language, sheetName + ".json");
            const fileContent = JSON.parse((0, $7jHWQ$fs.readFileSync)(pathToFile));
            Object.keys(fileContent)?.map((translationKey)=>{
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
        const uniqSheetKeys = (0, $7jHWQ$lodash.uniq)(sheetKeys);
        const sheetRows = [
            [
                "languages",
                ...languages
            ],
            ...uniqSheetKeys.map((translationKey)=>{
                const row = [
                    translationKey
                ];
                languages?.map((language)=>{
                    const pathToFile = (0, ($parcel$interopDefault($7jHWQ$path))).join(source, language, sheetName + ".json");
                    const fileContent = JSON.parse((0, $7jHWQ$fs.readFileSync)(pathToFile));
                    const keyValue = fileContent[translationKey] || "";
                    row.push(keyValue);
                });
                return row;
            }), 
        ];
        $c8d53969e53107c7$var$logging && console.log(`Sheet: ${sheetName}`);
        $c8d53969e53107c7$var$logging && console.table(sheetRows);
        return {
            name: sheetName,
            data: sheetRows
        };
    });
    const finalData = [
        {
            name: "package_settings",
            data: [
                [
                    "languages",
                    ...languages
                ]
            ]
        },
        ...sheetsData, 
    ];
    const finalDataWithAdjustedWidths = finalData?.map((sheet)=>({
            ...sheet,
            options: {
                "!cols": sheet?.data?.[0]?.map((cell)=>({
                        wpx: 200
                    }))
            }
        }));
    const xlsxBuffer = (0, ($parcel$interopDefault($7jHWQ$nodexlsx))).build(finalDataWithAdjustedWidths);
    (0, $7jHWQ$fs.writeFileSync)(output, xlsxBuffer);
};
var $c8d53969e53107c7$export$2e2bcd8739ae039 = $c8d53969e53107c7$var$xlsxBuilder;




//# sourceMappingURL=index.js.map
