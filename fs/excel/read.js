const xlsx = require("node-xlsx");
const mmt = require("minimist");
const fs = require("fs");

(function read() {
  try {
    const args = mmt(process.argv.slice(2));
    const input = args["input"];
    const output = args["output"];
    if (!input) {
      console.error("You might miss option --input=xxx.xlsx");
      return;
    }

    if (!output) {
      console.error("You might miss option --output=xxx.json");
      return;
    }

    const sheets = xlsx.parse(input);

    const data = [];
    sheets.forEach(function (sheet) {
      data.push(sheet);
    });

    fs.writeFile(output, JSON.stringify(data), (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("output: ", output);
    });
  } catch (error) {
    console.error(error);
  }
})();
