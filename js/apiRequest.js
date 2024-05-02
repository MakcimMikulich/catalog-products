const categoryLoader = document.getElementById("categoryLoader");
const categoryLoaderWrapper = document.querySelector(".simplebar-content");
const table = document.getElementById("table");

const url = "https://rest.eurotorg.by/10197/Json";

const bodyForCategory = JSON.stringify({
	CRC: "",
	Packet: {
		JWT: "null",
		MethodName: "EvrooptSite.GetListingSettings",
		ServiceNumber: "38198019-8D9A-474E-856B-ED5439DBFB26",
		Data: {
			ListingId: 1,
		},
	},
	data: [
		{
			dsadasd: "dasdada",
		},
		{},
	],
});

function deleteLoader(loader) {
	if (loader) {
		loader.remove();
	}
}

const requestOptionsCategory = {
	method: "POST",
	body: bodyForCategory,
	redirect: "follow",
};

function fetchCategory() {
	fetch(url, requestOptionsCategory)
		.then((response) => response.json())
		.then((result) => {
			deleteLoader(categoryLoader);
			createCategoryList(result.Table[0].ProductCategory);
		})
		.catch((error) => console.error(error));
}

function createCategoryList(categoryList) {
	const listElement = document.createElement("ul");
	listElement.className = "category__list";

	categoryList.forEach((category) => {
		const categoryHTML = `<a href="${"#"}"><li class="list__item">${
			category.CategoryListName
		}</li></a>`;

		listElement.innerHTML += categoryHTML;
	});

	categoryLoaderWrapper.appendChild(listElement);
}

fetchCategory();

export function fetchProduct(SortingId = -1) {
	const bodyForProduct = JSON.stringify({
		CRC: "",
		Packet: {
			JWT: "null",
			MethodName: "EvrooptSite.GetListing",
			ServiceNumber: "38198019-8D9A-474E-856B-ED5439DBFB26",
			Data: {
				ListingId: 1,
				SortingId: SortingId,
				CategoryListId: -1,
			},
		},
	});

	const requestOptionsProduct = {
		method: "POST",
		body: bodyForProduct,
		redirect: "follow",
	};

	createTableLoader();

	fetch(url, requestOptionsProduct)
		.then((response) => response.json())
		.then((result) => {
			deleteLoader(table.firstChild);
			createProducts(result.Table);
		})
		.catch((error) => console.error(error))
		.finally(() => {});
}

function createTableLoader() {
	table.innerHTML = `<div class="loader__wrapper">
						<div id="categoryLoader" class="lds-ring">
								<div></div>
								<div></div>
								<div></div>
								<div></div>
								<p>Загрзука товаров ...</p>
						</div>
					  </div>`;
}

function createProducts(productArr) {
	let tableHTML = "";

	productArr.forEach((product) => {
		const productDiscount = product.Price[0].Discount || "-0%";
		const classNameDiscount = product.Price[0].Discount
			? "header__discount"
			: "header__discount hidden";
		const productImg = product.ImageUrl;
		const ProductName = product.ProductName;
		const ProductCurrentPrice =
			product.Price[0].PriceRed || product.Price[0].Price;
		const ProductOldPrice = product.Price[0].Price;

		const productHTML = `<div class="table__card card">
		<div class="card__header">
			<div class="${classNameDiscount}">${productDiscount}</div>
			<div class="header__img">
				<img
					width="145" 
					height="145"
					src=${productImg}
					alt="imgProdcut"
				/>
			</div>
			<span class="header__note">Только до 31.07</span>
		</div>
		<div class="card__info">
			<div class="info__title">
			${ProductName}
			</div>
			<div class="info__price">
				<div class="price__wrapper">
					<div class="price__new">${ProductCurrentPrice}</div>
					${
						ProductCurrentPrice !== ProductOldPrice
							? `<div class="price__old">${ProductOldPrice}</div>`
							: ""
					}
				</div>
				<div class="price__kg">цена за 1кг</div>
			</div>
		</div>
	</div>`;

		tableHTML += productHTML;
	});

	table.innerHTML = tableHTML;
}

fetchProduct();

const SettingRequest = {
	CategoryListId: 101,
	SortingId: -1,
};

const CategoryList = {
	"Все категории": -1,
	Бакалея: 93,
	"Вода, напитки, соки, кофе, чай": 94,
	"Хлеб и хлебобулочные изделия": 96,
	"Шоколад, конфеты, печенье и другие сладости": 97,
	"Молочные продукты": 99,
	"Мясо, рыба, птица, колбасные изделия": 100,
	"Замороженные продукты": 101,
	"Овощи, фрукты, ягоды": 102,
	"Собственное производство и мясные полуфабрикаты": 103,
};

const SortingList = {
	"Без сортировки": -1,
	"Сначала дорогие": 2,
	"Сначала дешевые": 3,
	"По рейтингу": 4,
};

var p = new Proxy(SettingRequest, {
	set: function (target, prop, value, receiver) {
		target[prop] = value;
		console.log("property set: " + prop + " = " + value);
		// fetchData();
		return true;
	},
});
