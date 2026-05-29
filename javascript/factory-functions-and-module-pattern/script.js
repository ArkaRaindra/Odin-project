const name = "Bob";
const age = 28;
const color = "red"

const nowFancyObject = {name, age, color};
console.log({name, age, color});

function createUser(name) {
    const discordName = "@" + name;

    let reputation = 0;
    const getReputation = () => reputation;
    const giveReputation = () => { reputation++; };

    return {name, discordName, getReputation, giveReputation}
}

const josh = createUser("josh");
josh.giveReputation();
josh.giveReputation();
josh.giveReputation();

console.log({
    discordName: josh.discordName,
    reputation: josh.getReputation()
});

(() => console.log("foo"))();

const calculator = (() => {
  let lastResult;

  const add = (a, b) => {
    lastResult = a + b;
    return lastResult;
  };
  const subtract = (a, b) => {
    lastResult = a - b;
    return lastResult;
  };
  const multiply = (a, b) => {
    lastResult = a * b;
    return lastResult;
  };
  const divide = (a, b) => {
    lastResult = a / b;
    return lastResult;
  };
  const getLastResult = () => lastResult;

  return { add, subtract, multiply, divide, getLastResult };
})();

console.log(calculator.add(2, 5)); // 8
console.log(calculator.subtract(6, 2));
console.log(calculator.multiply(30, 5));
console.log(calculator.getLastResult()); 
console.log(calculator.multiply(14, 5534)); // 77476
