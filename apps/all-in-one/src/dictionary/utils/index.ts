const fr_en = [
  ['é', 'e'],
  ['ê', 'e'],
  ['è', 'e'],
  ['ë', 'e'],
  ['à', 'a'],
  ['â', 'a'],
  ['ç', 'c'],
  ['î', 'i'],
  ['ï', 'i'],
  ['ô', 'o'],
  ['ù', 'u'],
  ['û', 'u'],
  ['ü', 'u'],
  ['ÿ', 'y'],
];

export const clearFrench = (data: string) => {
  const rows = data.split('\n');
  const result = [];
  for (const row of rows) {
    result.push(clearStr(row));
  }
  let str = result.join('\n');
  str = `[${str}]`;
  str = str.replaceAll(/}\r\n/g, '},\n');
  str = str.replaceAll(/},\n\]/g, '}]\n');
  return str;
};

const clearStr = (str: string) => {
  for (const i of fr_en) {
    str = str.replaceAll(i[0], i[1]);
  }
  return str;
};
