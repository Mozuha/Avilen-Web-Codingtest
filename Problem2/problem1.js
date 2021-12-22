const input = require("fs").readFileSync("/dev/stdin", "utf8");
const inputs = input.split('\n');
const inputs1l = inputs[0].split(' ');
const n = parseInt(inputs1l[0]);
const N = parseInt(inputs1l[1]);
const A = inputs[1].split(' ').map(a => parseInt(a));

const min = Math.min(...A);
const max = Math.max(...A);

/* 
* 手元にある各水溶液の利用には制約がない(ただし水は使えない)ので、
* 目的の濃度が手元にある水溶液の最低濃度と最高濃度の間に含まれさえすればその濃度の水溶液を作成できる
*/
console.log((min <= N && N <= max) ? 'Yes' : 'No');