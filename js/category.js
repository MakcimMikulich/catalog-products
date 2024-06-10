"use strict";

const categoryLoader = document.getElementById("categoryLoader");
const categoryLoaderWrapper = document.querySelector(".simplebar-content");

import { deleteLoader, url, settings } from "./apiRequest.js";
import { filterClose } from "./filter.js";

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
});

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

	const links = listElement.querySelectorAll(".list__item");

	links[0].classList.add("active");

	links.forEach((link, index) => {
		link.addEventListener("click", () => {
			if (settings.CategoryListId !== categoryList[index].CategoryListId) {
				settings.CategoryListId = categoryList[index].CategoryListId;
			}
			links.forEach((el) => el.classList.remove("active"));
			link.classList.add("active");
			filterClose();
		});
	});

	categoryLoaderWrapper.appendChild(listElement);
}

fetchCategory();
