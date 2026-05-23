function sumOfTripledEvens(array) {
    return array
        .filter((num) => num % 2 === 0)
        .map((num) => num * 3)
        .reduce((sum, num) => sum + num, 0);
}

function addOne(num) {
    return num + 1;
}

const arr = [1, 2, 3, 4, 5];
const mappedArr = arr.map((num) => num + 1);
console.log(mappedArr) // Output: [2, 3, 4, 5, 6]

function isOdd(num) {
    return num % 2 !== 0;
}

const filteredArr = arr.filter(isOdd);
console.log(filteredArr) // Output: [1, 3, 5]
console.log(arr); 

const productofAllNums = arr.reduce((total, currentItem) => {
    return total * currentItem;
}, 1);
console.log(productofAllNums); // Output: 120