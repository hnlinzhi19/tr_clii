#!/usr/bin/env node
const excelToJson = require("convert-excel-to-json");
const fs = require("fs"); // 引入fs模块
const path = require("path"); // 引入fs模块
const program = require("commander");
var exec = require("child_process").exec;

console.log("test");
console.log(process.argv);
const file = process.argv[2];

if (!file) {
  console.log("没文件名");
  return;
}

const result = excelToJson({
  sourceFile: path.join(process.cwd(), `${file}`),
});

const fileName = file.replace(path.extname(file), "");

var cmd = `rm -fr */${fileName}.json`;

function isJSON(str) {
  if (typeof str == "string") {
    try {
      var obj = JSON.parse(str);
      if (typeof obj == "object" && obj) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.log("error：" + str + "!!!" + e);
      return false;
    }
  }
  console.log("It is not a string!");
}
exec(cmd, function (error, stdout, stderr) {
  // 获取命令执行的输出
  Object.keys(result).forEach((key) => {
    const sheetData = result[key];
    const allLang = {};
    // const langList = ["zh", "en", "id", "ar", "fil", "tr"];
    const langList = [
      "zh",
      "en",
      "ar",
      "id",
      "fil",
      "tr",
      "vi",
      "zh-TW",
      "th",
      "ko",
      "es",
    ];

    langList.forEach((lang) => {
      allLang[lang] = {};
    });

    sheetData.forEach((maps, idx) => {
      if (maps && maps["F"]) {
        // meyo exchange
        // allLang["zh"][maps["F"]] = maps["C"];
        // allLang["en"][maps["F"]] = maps["D"];
        // allLang["ar"][maps["F"]] = maps["F"];
        // allLang["id"][maps["F"]] = maps["E"];
        // allLang["fil"][maps["F"]] = maps["G"];
        // allLang["tr"][maps["F"]] = maps["H"];
        // allLang["vi"][maps["F"]] = maps["I"];
        // 活动
        // allLang["zh"][maps["F"]] = maps["C"];
        // allLang["en"][maps["F"]] = maps["D"];
        // allLang["id"][maps["F"]] = maps["E"];
        // allLang["ar"][maps["F"]] = maps["F"];
        // allLang["fil"][maps["F"]] = maps["G"];
        // allLang["vi"][maps["F"]] = maps["H"] || maps["D"];
        // allLang["tr"][maps["F"]] = maps["D"] || maps["D"];
        // allLang["zh-TW"][maps["F"]] = maps["I"] || maps["C"];
        // allLang["th"][maps["F"]] = maps["J"] || maps["D"];

        // tr
        allLang["zh"][maps["F"]] = maps["G"] || maps["H"];
        allLang["en"][maps["F"]] = maps["H"] || maps["H"];
        allLang["id"][maps["F"]] = maps["I"] || maps["H"];
        allLang["ar"][maps["F"]] = maps["J"] || maps["H"];
        allLang["fil"][maps["F"]] = maps["K"] || maps["H"];
        allLang["tr"][maps["F"]] = maps["L"] || maps["H"];
        allLang["vi"][maps["F"]] = maps["M"] || maps["H"];
        allLang["zh-TW"][maps["F"]] = maps["N"] || maps["H"];
        allLang["th"][maps["F"]] = maps["O"] || maps["H"];
        allLang["ko"][maps["F"]] = maps["P"] || maps["H"];
        allLang["es"][maps["F"]] = maps["Q"] || maps["H"];

        // kito
        /* allLang["zh"][maps["F"]] = maps["C"]; */
        /* allLang["en"][maps["F"]] = maps["D"]; */
        /* allLang["id"][maps["F"]] = maps["I"]; */
        /* allLang["ar"][maps["F"]] = maps["E"]; */
        /* allLang["fil"][maps["F"]] = maps["G"]; */
        /* allLang["vi"][maps["F"]] = maps["F"]; */
        /* allLang["tr"][maps["F"]] = maps["H"] || maps["D"]; */
        /* allLang["zh-TW"][maps["F"]] =  maps["K"]; */
        /* allLang["th"][maps["F"]] = maps["J"]; */
      }
    });

    langList.forEach((lang) => {
      if (isJSON(JSON.stringify(allLang[lang]))) {
        fs.writeFile(
          path.join(process.cwd(), `${lang}/${fileName}.json`),
          // path.join(process.cwd(), `${lang}.json`),
          JSON.stringify(allLang[lang]),
          { flag: "a" },
          (err, re) => {
            if (err) {
              return console.log("err");
            }
            console.log("生成完成", lang);
          }
        );
      } else {
        console.log(`非法json:${lang}`);
      }
    });
  });
});
