# xlsx-to-i18n-converter

## under development, but usable

Node.js tool which takes XLSX document like:

![Example](https://github.com/kolyasya/xlsx-to-i18n-converter/blob/main/documentation/images/xlsx-doc-example.png?raw=true)

And converts all its lists into folders with JSON files like:

![Example](https://github.com/kolyasya/xlsx-to-i18n-converter/blob/main/documentation/images/json-result-example.png?raw=true)

Also can build up XLSX from existing JSON files with `build-xlsx` command

### Installation

```
npm install --save xlsx-to-i18n-converter
```

### XLSX → JSON (check `./example` folder for XLSX source):

```
npx xlsx-to-i18n-converter convert -s ./imports/internationalization/internationalization.xlsx -o ./example/result
```

### JSON → XLSX

```
npx xlsx-to-i18n-converter build-xlsx -s ./example/result -o ./example/imported.xlsx
```
