// there's certainly a better way to do this...

const solve = (A, B, C) => {
  const min = Math.min(A, B, C);
  const max = Math.max(A, B, C);

  // case 1
  if ((A !== B && B !== C && C !== A) && (B === min || B === max)) return 0;

  // case 2
  if (A === B && B === C && C === A) {
    if (A >= 3) return 3;
    else return -1;
  }

  // case 3: BAC or BCA or ABC(A==B) or CBA(C==B)
  if (B === min) {  // Bがmin、ではなくBの値がminと同じ
    if (A !== min && C !== min) {  // Bの位置が左端(最小)で確定 -> BAC or BCA
      // case 1で通っていなくてここに来たということはAとCが同値(value of max)ということ
      if (max-min > 1) return 1;  // 1 3 3, 2 6 6, etc...
      else {  // max-min == 1
        if (min === 1) return -1;  // 1 2 2
        else return 2;  // 2 3 3, 6 7 7, etc...
      }
    } else if (A === min || C === min) {  // A(or C)とBが同値(value of min)でC(or A)が別値(value of max)
      if (min === 1) return -1;  // 1 1 2, 1 1 5, etc..
      else return 1;  // 2 2 3, 5 5 8, etc...
    }  // A==min&&C==minはA==B==Cとなるのでcase 2で通る
  }

  // case 4: ACB or CAB or ABC(B==C) or CBA(B==A)
  if (B === max) {  // Bがmax、ではなくBの値がmaxと同じ
    if (A !== max && C !== max) {  // Bの位置が右端(最大)で確定 -> ACB or CAB
      // case 1で通っていなくてここに来たということはAとCが同値(value of min)ということ
      if (min === 1) return -1;  // 1 1 2, 1 1 5, etc...
      else return 1;  // 2 2 3, 5 5 8, etc...
    } else if (A === max || C === max) {  // A(or C)とBが同値(value of max)でC(or A)が別値(value of min)
      if (max-min > 1) return 1;  // 1 3 3, 2 6 6, etc...
      else {  // max-min == 1
        if (min === 1) return -1;  // 1 2 2
        else return 2;  // 2 3 3, 6 7 7, etc...
      }
    }  // A==max&&C==maxはA==B==Cとなるのでcase 2で通る
  }

  // case 5: A<B<C or C<B<A
  // 選択肢はBを減らすかmaxを減らすかの2択
  let flg = false;
  if (B-min < max-B) {  // Bを減らす
    if (min === 1) flg = true;  // 1 3 6, 1 6 12, etc...; maxを減らすしかない
    else return B-min + 1;  // 2 3 6, 2 6 12, etc...
  }
  if (B-min > max-B || flg) {  // maxを減らす
    // ここにいるということはAとBとCがそれぞれ別値なので、B-minやmax-Bの最低値は1
    // その上でB-min>max-Bということは、B-min>1が保証される(i.e. 減らしたmaxが入るスペースがある)
    return max-B + 1;  // 1 3 6, 2 4 5, etc...
  }
  if (B-min === max-B) {  // どっちでも良い
    if (min === 1) return -1;  // 1 2 3
    else return B-min + 1;
  }
}

const input = require("fs").readFileSync("/dev/stdin", "utf8");
const inputs = input.split('\n');
const T = parseInt(inputs[0]);

for (let i = 1; i <= T; ++i) {
  let [A, B, C] = inputs[i].split(' ').map(n => parseInt(n));
  console.log(solve(A, B, C));
}