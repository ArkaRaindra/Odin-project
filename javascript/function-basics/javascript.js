function favoriteAnimal(animal) {
  return animal + " is my favorite animal!"
}

const message = favoriteAnimal("dog");
console.log(message);

function add7 (num) {
    return num + 7;
}

const ten = add7(10);
console.log(ten);

function multiply (num1, num2) {
    return num1 * num2;
}

const product = multiply(3, 2);
console.log(product);

function capitalize (str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

const capitalized = capitalize("aBcD");
console.log(capitalized);

function lastLetter (str) {
    return str.charAt(str.length - 1);
}

const last = lastLetter("abcd");
console.log(last);