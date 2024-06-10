import { createPagination } from "./pagination.js";

const table = document.getElementById("table");

export const url = "https://rest.eurotorg.by/10197/Json";

export function deleteLoader(loader) {
	if (loader) {
		loader.remove();
	}
}

export function fetchProduct() {
	const bodyForProduct = JSON.stringify({
		CRC: "",
		Packet: {
			JWT: "null",
			MethodName: "EvrooptSite.GetListing",
			ServiceNumber: "38198019-8D9A-474E-856B-ED5439DBFB26",
			Data: SettingRequest,
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
			const { PageCount, ProductCount, Products } = result.Table[0];
			console.log(result);
			deleteLoader(table.firstChild);
			createProducts(Products);
			createPagination(PageCount);
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

const SettingRequest = {
	ListingId: 1,
	CategoryListId: -1,
	SortingId: -1,
	ProductCountPerPage: 24,
	PageNumber: 1,
};

fetchProduct();

export const settings = new Proxy(SettingRequest, {
	set: function (target, prop, value, receiver) {
		target[prop] = value;
		console.log("property set: " + prop + " = " + value);

		if (prop !== "PageNumber") {
			target.PageNumber = 1;
		}

		console.log(target);
		fetchProduct();

		return true;
	},
});
