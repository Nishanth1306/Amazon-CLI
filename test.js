
let a = "3[bx4{ca}]";
let stack = [];

for (let i = 0; i < a.length; i++) {
  if (!isNaN(a[i])) {
    stack.push(a[i]);
  }
  
  else if (a[i] === "[" || a[i] === "{") {
    stack.push(a[i]);
  }
  
  
  else if (a[i] === "]" || a[i] === "}") {
    let tstr = "";
    while (stack.length > 0 && stack[stack.length - 1] !== "[" && stack[stack.length - 1] !== "{") {
        tstr = stack.pop() + tstr;
    }

    stack.pop(); 

    let countNumber = "";
    while (stack.length > 0 && !isNaN(stack[stack.length - 1])) {
      countNumber = stack.pop() + countNumber;
    }

    let repeated = tstr.repeat(Number(countNumber));
    for (let char of repeated) {
      stack.push(char);
    }
  } else {
    stack.push(a[i]);
  }
}

console.log(stack);
console.log(stack.toString());
