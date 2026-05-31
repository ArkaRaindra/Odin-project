import "./style.css";
import cakeImg from "./assets/cake.jpg";
import cakeGif from "./assets/Cake.gif";

const content = document.getElementById("content");

const homeTemplate = content.innerHTML;

const menuTemplate = `
<div class="menu-home">
    <div class="selector">
        <button data-filter="all" class="active">All</button>
        <button data-filter="dessert">Dessert</button>
        <button data-filter="drinks">Drinks</button>
    </div>

    <div class="menu">
        <div class="menu-all">

            <div class="card dessert">
                <div class="card-img">
                    <img src="${cakeImg}" alt="Cake">
                </div>
                <div class="card-text">
                    <h2>Strawberry Cake</h2>
                    <p>Sweet strawberry cake.</p>

                    <div class="price">
                        <h2>$1</h2>
                        <p>Rp.15000</p>
                    </div>

                    <button>Order Now</button>
                </div>
            </div>

            <div class="card dessert">
                <div class="card-img">
                    <img src="assets/cake.jpg" alt="Cake">
                </div>
                <div class="card-text">
                    <h2>Chocolate Cake</h2>
                    <p>Rich chocolate flavor.</p>

                    <div class="price">
                        <h2>$2</h2>
                        <p>Rp.30000</p>
                    </div>

                    <button>Order Now</button>
                </div>
            </div>

            <div class="card dessert">
                <div class="card-img">
                    <img src="assets/cake.jpg" alt="Cake">
                </div>
                <div class="card-text">
                    <h2>Cheese Cake</h2>
                    <p>Soft and creamy.</p>

                    <div class="price">
                        <h2>$2</h2>
                        <p>Rp.30000</p>
                    </div>

                    <button>Order Now</button>
                </div>
            </div>

            <div class="card drinks">
                <div class="card-img">
                    <img src="assets/tea.jpg" alt="Tea">
                </div>
                <div class="card-text">
                    <h2>Milk Tea</h2>
                    <p>HTT special tea.</p>

                    <div class="price">
                        <h2>$1</h2>
                        <p>Rp.15000</p>
                    </div>

                    <button>Order Now</button>
                </div>
            </div>

            <div class="card drinks">
                <div class="card-img">
                    <img src="assets/tea.jpg" alt="Tea">
                </div>
                <div class="card-text">
                    <h2>Green Tea</h2>
                    <p>Fresh japanese tea.</p>

                    <div class="price">
                        <h2>$2</h2>
                        <p>Rp.25000</p>
                    </div>

                    <button>Order Now</button>
                </div>
            </div>

            <div class="card drinks">
                <div class="card-img">
                    <img src="assets/tea.jpg" alt="Tea">
                </div>
                <div class="card-text">
                    <h2>Lemon Tea</h2>
                    <p>Sweet and refreshing.</p>

                    <div class="price">
                        <h2>$2</h2>
                        <p>Rp.25000</p>
                    </div>

                    <button>Order Now</button>
                </div>
            </div>

        </div>
    </div>
</div>
<div class="footer">
        <p>@Copyright 2026</p>
</div>
`;

const aboutTemplate = `
<div class="about-section">

    <h1>About Ho-kago Tea Time</h1>

    <p>
        Ho-kago Tea Time (HTT) is the band formed by
        Yui Hirasawa, Mio Akiyama,
        Ritsu Tainaka, Tsumugi Kotobuki,
        and Azusa Nakano.
    </p>

    <br>

    <p>
        This restaurant page is inspired by the
        warm atmosphere of the Light Music Club,
        where tea, cakes and friendship are
        always present after school.
    </p>
    <img src="${cakeGif}" alt="cake">

</div>

<div class="footer">
    <p>@Copyright 2026</p>
</div>
`;

function setActive(buttonId) {
    document
        .querySelectorAll(".buttons button")
        .forEach(btn =>
            btn.classList.remove("active-nav")
        );

    document
        .getElementById(buttonId)
        .classList.add("active-nav");
}

function initMenuFilter() {
    const buttons =
        document.querySelectorAll("[data-filter]");

    const cards =
        document.querySelectorAll(".card");

    buttons.forEach(button => {
        button.addEventListener("click", () => {

            buttons.forEach(btn =>
                btn.classList.remove("active")
            );

            button.classList.add("active");

            const filter =
                button.dataset.filter;

            cards.forEach(card => {

                if (
                    filter === "all" ||
                    card.classList.contains(filter)
                ) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });
}

function renderHome() {
    content.innerHTML = homeTemplate;

    setActive("home-btn");

    const discoverButton =
        document.querySelector(".hero button");

    if (discoverButton) {
        discoverButton.addEventListener(
            "click",
            renderMenu
        );
    }
}

function renderMenu() {
    content.innerHTML = menuTemplate;

    setActive("menu-btn");

    initMenuFilter();
}

function renderAbout() {
    content.innerHTML = aboutTemplate;

    setActive("about-btn");
}

document
    .getElementById("home-btn")
    .addEventListener("click", renderHome);

document
    .getElementById("menu-btn")
    .addEventListener("click", renderMenu);

document
    .getElementById("about-btn")
    .addEventListener("click", renderAbout);

renderHome();