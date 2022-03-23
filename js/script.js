let navbar = document.querySelector(".navbar");
let cart = document.querySelector(".cart-content");
let cartShooping = document.querySelector(".cart-items-container");
let search = document.querySelector(".search-form");
let productEl = document.querySelector(".menu-container");
let subotalEl = document.querySelector(".total-price");
let cartItem = document.querySelector(".number-item");
let searchBox = document.querySelector(".search-box");
let Box = document.querySelector(".box");
let searchBtn = document.querySelector("#search-btn");
let modalBg = document.querySelector(".modal-src-bg");
let closeSrcBtn = document.querySelector(".search-close");
let filteredData = document.querySelector(".filtered-data");

function renderItems() {
	producs.forEach((product) => {
		productEl.innerHTML += `
        <div class="box">
        <img src="${product.imgsrc}">
        <h3>${product.name}</h3>
        <div class="price">ت ${product.price} <span> ت21 </span></div>
        <button class="btn-menu" onclick="addTocart(${product.id})" >افزودن به سبد خرید</button>
    </div>
        `;
		// updatecart();
	});
}
renderItems();

searchBox.addEventListener("keyup", (e) => {
	const term = e.target.value.toLowerCase();
	const coffees = producs;
	Array.from(coffees);
	const filteredcoffe = coffees.filter((coffe) => {
		return coffe.name.includes(term);
	});
	filteredData.innerHTML = "";
	filteredcoffe.forEach((coffeItem) => {
		if (e.target.value === "") {
			filteredcoffe = "";
		} else {
			filteredData.innerHTML += ` 
                <div class="box">
              <img src="${coffeItem.imgsrc}">
              <h3>${coffeItem.name}</h3>
              <div class="price">ت ${coffeItem.price} <span> ت21 </span></div>
              <button class="btn-menu" onclick="addTocart(${coffeItem.id})" >افزودن به سبد خرید</button>
          </div>
                `;
		}
	});

	console.log(filteredcoffe);
});

let card = JSON.parse(localStorage.getItem("cart")) || [];
updatecart();
function addTocart(id) {
	if (card.some((item) => item.id === id)) {
		changeNumberOfUnits("plus", id);
	} else {
		const item = producs.find((product) => product.id === id);
		console.log(item);
		card.push({ ...item, numberOfUnits: 1 });
		console.log("thats card", card);

		updatecart();
	}
}

function updatecart() {
	renderItemsInTheCart();
	rendersubitems();
	localStorage.setItem("cart", JSON.stringify(card));
}

function renderItemsInTheCart() {
	cart.innerHTML = "";
	card.forEach((item) => {
		// console.log("that the item in renderItems",item);
		cart.innerHTML += `
            <div class="cart-item">
            <button class="fas fa-times" onclick="removeItem(${item.id})"></button>
            <img src="${item.imgsrc}" alt="${item.name}">
            <div class="content">
                <h4>${item.name}</h4>
                <div class="price">
                ${item.price} ریال 
                </div>
                <div class="Units">
                <div class="btn-minus" onclick="changeNumberOfUnits('minus',${item.id})">-</div>
                <div class="number">${item.numberOfUnits}</div>
                <div class="btn-plus" onclick="changeNumberOfUnits('plus',${item.id})">+</div>
                </div>

            </div>
        </div>`;
	});
}
function changeNumberOfUnits(action, id) {
	card = card.map((item) => {
		let numberOfUnits = item.numberOfUnits;
		if (item.id === id) {
			if (action === "minus" && numberOfUnits > 1) {
				numberOfUnits--;
			} else if (action === "plus" && numberOfUnits < item.instock) {
				numberOfUnits++;
			}
		}
		return {
			...item,
			numberOfUnits,
		};
	});
	updatecart();
}

function rendersubitems() {
	let totalPrice = 0,
		totalItems = 0;
	card.forEach((item) => {
		totalPrice += item.price * item.numberOfUnits;
		totalItems += item.numberOfUnits;
	});
	subotalEl.innerHTML = `قیمت کل:${totalPrice} تومان`;
	cartItem.innerHTML = `${totalItems}`;
}
function removeItem(id) {
	card = card.filter((item) => item.id !== id);
	updatecart();
}
// function clearcart(){

//     updatecart();
// }
const displayMenu = (card) => {
	const htmlString = card.map((item) => {
		return `
        <div class="box">
        <img src="${item.imgsrc}">
        <h3>${item.name}</h3>
        <div class="price">ت ${item.price} <span> ت21 </span></div>
        <button class="btn-menu" onclick="addTocart(${item.id})" >افزودن به سبد خرید</button>
    </div>
        `;
	});
};

document.querySelector("#menu-btn").onclick = () => {
	navbar.classList.toggle("active");
	cart.classList.remove("active");
	modalBg.classList.remove("active");
};
document.querySelector("#cart-btn").addEventListener("click", () => {
	cartShooping.classList.toggle("active");
	navbar.classList.remove("active");
	modalBg.classList.remove("active");
});
document.querySelector("#search-btn").addEventListener("click", () => {
	modalBg.classList.toggle("active");
	navbar.classList.remove("active");
	cart.classList.remove("active");
});
window.onscroll = () => {
	navbar.classList.remove("active");
	cartShooping.classList.remove("active");
	modalBg.classList.remove("active");
};
searchBtn.addEventListener("click", () => {
	modalBg.classList.add("btn-active");
});
closeSrcBtn.addEventListener("click", () => {
	modalBg.classList.remove("btn-active");
});
