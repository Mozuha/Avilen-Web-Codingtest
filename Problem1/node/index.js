const http = require('http');
const url = require('url');

const server = http.createServer(async (req, res) => {
  // const queryObject = url.parse(req.url, true).query;
  // console.log(queryObject);

  // ここに処理を記述してください。
  // ans = "answer";
  let data = '';
  req.setEncoding('utf8');  // エンコード形式を指定しないとparseの際に問題が起きる
  for await (const chunk of req) data += chunk;  // 全データが届くのを待つ
  console.log(data);  // pattern=%7B%22obj%22%3A%5B%7B%22num%22%3...

  const params = new URLSearchParams(data);
  const pattern = params.get('pattern');
  console.log(pattern);  // {"obj":[{"num":4,"text":"fizz"},...

  let ans = fizzBuzz(JSON.parse(pattern).obj);

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Request-Method', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(ans);
  res.end();
});
server.listen(8080); 


const fizzBuzz = (arr) => {
  let res = "";

  for (let i = 1; i <= 30; ++i) {
    let cnt = 0;  // ある数字iを割り切れるnumの個数
    for (let j = 0; j < arr.length; ++j) {
      if (i % arr[j].num === 0) {
        if (cnt > 0) res += ' ';  // このnumより前にこのiを割り切れたものがある -> スペース空けてtextをin (fizz buzz)
        res += arr[j].text;
        cnt++;
      }
    }
    if (i < 30) cnt === 0 ? res += i + ', ' : res += ', ';  // どのnumでも割り切れなかったなら数字をin
  }

  return res;
}