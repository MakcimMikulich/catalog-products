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
		paginationHTML += `<div class="pagination__button with-arrow left" data-page="${
			currentPage - 1
		}"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M8.78089 8.00047L5.48108 4.70062L6.42389 3.75781L10.6666 8.00047L6.42389 12.2431L5.48108 11.3003L8.78089 8.00047Z" fill="currentColor"/>
			</svg></div>`;
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
		paginationHTML += `<div class="pagination__button with-arrow" data-page="${
			currentPage + 1
		}"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M8.78089 8.00047L5.48108 4.70062L6.42389 3.75781L10.6666 8.00047L6.42389 12.2431L5.48108 11.3003L8.78089 8.00047Z" fill="currentColor"/>
			</svg></div>`;
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
