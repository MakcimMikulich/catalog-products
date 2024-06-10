import { settings } from "./apiRequest.js";

const pagination = document.getElementById("pagination");

export function createPagination(totalPage) {
	let paginationHTML = "";

	const maxVisiblePages = 5;
	const currentPage = settings.PageNumber;

	if (totalPage === 1) {
		pagination.innerHTML = ``;
		return;
	}

	if (currentPage > 1) {
		paginationHTML += `<div class="pagination__button" data-page="${
			currentPage - 1
		}">Prev</div>`;
	}

	let startPage = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1);
	let endPage = Math.min(startPage + maxVisiblePages - 1, totalPage);

	if (endPage - startPage < maxVisiblePages - 1) {
		startPage = Math.max(endPage - maxVisiblePages + 1, 1);
	}

	for (let index = startPage; index <= endPage; index++) {
		const activeClass = index === currentPage ? "active" : "";
		const element = `<div class="pagination__button ${activeClass}" data-page="${index}">${index}</div>`;
		paginationHTML += element;
	}

	if (currentPage < totalPage) {
		paginationHTML += `<div class="pagination__button" data-page="${
			currentPage + 1
		}">Next</div>`;
	}

	pagination.innerHTML = paginationHTML;

	const pages = pagination.querySelectorAll(".pagination__button");

	pages.forEach((page) => {
		page.addEventListener("click", () => {
			const pageNumber = parseInt(page.getAttribute("data-page"));
			if (settings.PageNumber !== pageNumber) {
				settings.PageNumber = pageNumber;
				createPagination(totalPage);
			}
		});
	});
}
