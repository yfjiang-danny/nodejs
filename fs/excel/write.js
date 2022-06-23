const fs = require("fs");
const xlsx = require("node-xlsx");
const mmt = require("minimist");

(function write() {
  try {
    const args = mmt(process.argv.slice(2));
    const input = args["input"];
    const output = args["output"];
    if (!input) {
      console.error("You might miss option --input=xxx.json");
      return;
    }

    if (!output) {
      console.error("You might miss option --output=xxx.xlsx");
      return;
    }

    const data = fs.readFileSync(input, "utf-8");

    const buffer = xlsx.build(JSON.parse(data));

    // 写入文件
    fs.writeFile(output, buffer, function (err) {
      if (err) {
        console.log("Write failed: " + err);
        return;
      }

      console.log("Write completed.");
    });
  } catch (error) {
    console.error(error);
  }
})();
