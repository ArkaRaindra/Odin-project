const controls = document.querySelector('.controls');

const display = controls.previousElementSibling;
console.log(display);

const div = document.createElement("div");
controls.appendChild(div);

div.style.color ="blue";
div.style.backgroundColor = "red";
div.setAttribute("id", "theDiv");
div.getAttribute("id");
console.log(div.getAttribute("id"));
div.removeAttribute("id");

div.innerHTML = "<span>Hello World!</span>"

const container = document.querySelector("#container");

const content = document.createElement("div");
content.classList.add("content");
content.textContent = "This is the glorious text-content!";
content.innerHTML = "<h3>I'm a blue h3</h3>"

content.style.color = "blue"

container.appendChild(content);

const exercise = document.querySelector('.exercise');

const answer = document.createElement("div");
answer.innerHTML = "<p>Hey I`m red</p>"

answer.style.color = "red"

exercise.appendChild(answer);

const box = document.createElement("div");
box.style.border = "2px solid black"
box.style.backgroundColor = "pink"

const h1 = document.createElement("h1")
h1.textContent = "I'm in a div"

const p = document.createElement("p")
p.textContent = "ME TOO!"

box.appendChild(h1);
box.appendChild(p);


container.appendChild(box);

// button
const btn = document.querySelector("#btn");
btn.addEventListener("click", () => {
    alert("Hello WOrld");
});

btn.addEventListener("click", function (e) {
    alert("Hellow")
    console.log(e.target);
    e.target.style.background = "blue";
});

const buttons = document.querySelectorAll("button");

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        alert(button.id);
    });
});