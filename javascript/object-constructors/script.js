function Book(title, author, pages, read) {
    if (!new.target) {
        throw Error("You must have the 'new' operator to call the constructor")
    }
    this.title = title;
    this.author = author;
    this.pages = pages + " pages";
    this.read = read;
    this.getbook = function(){
        console.info(this.title + this.author + ", " + this.pages + "," + this.read);
    };
}

const book1 = new Book("The Hobbit by J.R.R."," Tolkien", "295"," not read yet");
book1.getbook();

// diff
function Person(name) {
    this.name = name
}

Person.prototype.sayName = function() {
    console.log(`Hello, I'm ${this.name}!`);
};

function Player(name, marker) {
    this.name = name;
    this.marker = marker;
}

Object.setPrototypeOf(Player.prototype, Person.prototype)

function Enemy(name) {
    this.name = name;
    this.marker = "^";
}

Object.setPrototypeOf(Enemy.prototype, Person.prototype)

Enemy.prototype.sayName = function() {
    console.log("HAHAHAHHAHA");
};

const carl = new Player("carl", "X");
carl.sayName();
