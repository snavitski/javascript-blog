"use strict";
/*document.getElementById('test-button').addEventListener('click', function(){
    const links = document.querySelectorAll('.titles a');
    console.log('links:', links);
  });*/
const titleClickHandler = function () {
	event.preventDefault();
	const clickedElement = this;
	console.log("Link was clicked!");

	/* [DONE] remove class 'active' from all article links  */
	const activeLinks = document.querySelectorAll(".titles a.active");

	for (let activeLink of activeLinks) {
		activeLink.classList.remove("active");
	}

	/* [In PROGRESS] add class 'active' to the clicked link */
	console.log("clickedElement:", clickedElement);

	/* [DONE] remove class 'active' from all articles */
	const activeArticles = document.querySelectorAll(".post a.active");
	for (let activeArticle of activeArticles) {
		activeArticle.classList.remove("active");
	}

	/* get 'href' attribute from the clicked link */
	const articleSelector = clickedElement.getAttribute("href");
	console.log(articleSelector);

	/* find the correct article using the selector (value of 'href' attribute) */
	const activeArticle = document.querySelector(articleSelector);

	/* add class 'active' to the correct article */
	activeArticle.classList.add("active");
};

const links = document.querySelectorAll(".titles a");

for (let link of links) {
	link.addEventListener("click", titleClickHandler);
}
