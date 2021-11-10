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

	const optArticleSelector = ".post",
		optTitleSelector = ".post-title",
		optTitleListSelector = ".titles";

	function generateTitleLinks() {
		/* remove contents of titleList */
		const titleList = document.querySelector(optTitleListSelector);
		function clearMessages() {
			document.getElementById("messages").innerHTML = "titleList";
		}
		/* for each article */
		const articles = document.querySelectorAll(".post");

		let html ='';
		for(let article of articles){
		/* get the article id */
		const articleId = document.getAttribute("id");
		/* find the title element */
		const articleTitle = article.querySelector(optTitleSelector).innerHTML;
		/* get the title from the title element */

		/* create HTML of the link */
		const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
		console.log(linkHTML);
		/* insert link into titleList */
		html = html + linkHTML;
		}

		titleList.innerHTML = html;
		const links = document.querySelectorAll(".titles a");
		console.log(links);

		for (let link of links) {
			link.addEventListener("click", titleClickHandler);
		}
	}
	generateTitleLinks();
