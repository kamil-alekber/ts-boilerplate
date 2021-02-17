const args = process.argv;
const fileArg = args.find((arg) => arg.match(/^--file=/));
const outArg = args.find((arg) => arg.match(/^--out=/));
const showArg = args.find((arg) => arg.match(/^--show/));

if (!fileArg) {
  throw new Error(
    `You should provide path to a YAML-file. Example: "node yaml.js --file=test.yml"`
  );
}
if (!outArg) {
  throw new Error(
    `You should provide a destination path. Example: "node yaml.js --out=test.json"`
  );
}

const filePath = fileArg.split("=")[1];
const outPath = outArg.split("=")[1];

const YAML = require("yaml");
const fs = require("fs");

const exists = fs.existsSync(filePath);
if (!exists) {
  throw new Error(`Can not locate file in the given path: "${filePath}"`);
}

const file = fs.readFileSync(filePath, "utf8");
console.warn(`Parsing YAML-file: ${filePath}`);

const parsed = YAML.parse(file, { indentSeq: true });

const strings = JSON.stringify(parsed, null, 2);

if (showArg) {
  console.log(strings);
}
fs.writeFileSync(outPath, strings);
console.warn(`Destination: ${outPath}\n\r`);
