# xlsx-to-i18n-converter

Node.js tool which takes XLSX document like:

![Example](https://github.com/kolyasya/xlsx-to-i18n-converter/blob/main/documentation/images/xlsx-doc-example.png?raw=true)

And converts all its lists into folders with JSON files like:

![Example](https://github.com/kolyasya/xlsx-to-i18n-converter/blob/main/documentation/images/json-result-example.png?raw=true)

Still under development and testing.

Not published to NPM yet, so:

```
npm install --save https://github.com/kolyasya/xlsx-to-i18n-converter
```

Run like (check `example` folder for XLSX source):

```
npx xlsx-to-i18n-converter convert --source ./imports/internationalization/internationalization.xlsx --output ./example/result
```
