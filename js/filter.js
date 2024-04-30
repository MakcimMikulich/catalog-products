const button = document.getElementById("button-filter");
const filter = document.querySelector(".sidebar__wrapper");
const btnClose = document.querySelector(".sidebar__close");

const wrapper = document.querySelector(".sidebar__wrapper");
const sidebar = document.querySelector(".catalog__sidebar");

const filterOpen = () => {
	filter.classList.add("active");
	document.body.classList.add("lock");
};

const filterClose = () => {
	filter.classList.remove("active");
	document.body.classList.remove("lock");
};

button.addEventListener("click", filterOpen);

btnClose.addEventListener("click", filterClose);

wrapper.addEventListener("click", filterClose);
sidebar.addEventListener("click", (e) => {
	e.stopPropagation();
});
