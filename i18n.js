'use strict';


const result = excelToJson({
    sourceFile: '1.2.xlsx',
});

Object.keys(result).forEach((key)=>{
  const sheetData = result[key];
  const en = {};
  sheetData.forEach((maps,idx)=>{
    if (maps && maps['B'] && idx > 0) {
      en[maps['B']] = maps['C'];
    }
  });
  fs.writeFile('./en/x.json',JSON.stringify(en),{ 'flag': 'a' },(err,re)=>{
    if (err){
      return console.log('err');
    }
    console.log('生成完成')
  })


});