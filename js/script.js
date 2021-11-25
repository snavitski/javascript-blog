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
	optTitleListSelector = ".titles",
	optArticleTagsSelector = ".post-tags .list",
	optArticleAuthorSelector = ".post-author",
	optTagsListSelector = ".tags .list",
	optCloudClassCount = 5,
	optCloudClassPrefix = 'tag-size',
	optAuthorListSelector = '.author-name';

function generateTitleLinks() {
	/* remove contents of titleList */
	const titleList = document.querySelector(optTitleListSelector);
	function clearMessages() {
		document.getElementById("messages").innerHTML = "titleList";
	}
	/* for each article */
	const articles = document.querySelectorAll(".post");

	let html = "";
	for (let article of articles) {
		/* get the article id */
		const articleId = article.getAttribute("id");
		/* find the title element */
		const articleTitle = article.querySelector(optTitleSelector).innerHTML;
		/* get the title from the title element */

		/* create HTML of the link */
		const linkHTML =
			'<li><a href="#' +
			articleId +
			'"><span>' +
			articleTitle +
			"</span></a></li>";
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

function calculateTagsParams(tags) {
	const params = {
		max: 0,
		min: 999999,
	};
	for (let tag in tags) {
		if (tags[tag] > params.max) {
			params.max = tags[tag];
		} else if (tags[tag] < params.min) {
			params.min = tags[tag];
		}
	}
	return params;
}
function calculateTagClass(count, params) {
	const normalizedCount = count - params.min;
	const normalizedMax = params.max - params.min;
	const percentage = normalizedCount / normalizedMax;
	const classNumber = Math.floor(percetage * (optCloudClassCount - 1) +1);
	return optCloudClassPrefix + classNumber;
}
function generateTags() {
	let allTags = {};
	/* find all articles */
	const articles = document.querySelectorAll(optArticleSelector);
	/* START LOOP: for every article: */
	for (let article of articles) {
		/* find tags wrapper */
		const tagsWrapper = article.querySelector(optArticleTagsSelector);
		/* make html variable with empty string */
		let html = "";
		/* get tags from data-tags attribute */
		const articleTags = article.getAttribute("data-tags");
		/* split tags into array */
		const articleTagsArray = articleTags.split(" ");
		console.log(articleTagsArray);
		/* START LOOP: for each tag */
		for (let tag of articleTagsArray) {
			/* generate HTML of the link */
			const tagLinkHtml =
				'<li><a href="#tag-' + tag + '"><span>' + tag + "</span></a></li>";
			/* add generated code to html variable */
			html = html + tagLinkHtml;
			console.log(tagLinkHtml);
			if (!allTags[tag]) {
				allTags[tag] = 1;
			} else {
				allTags[tag]++;
			}
		}
		/* insert HTML of all the links into the tags wrapper */
		tagsWrapper.innerHTML = html;
	}
	const tagList = document.querySelector(".tags");
	//tagList.innerHTML = allTags.join(' ');
	const tagsParams = calculateTagsParams(allTags);
	
	let allTagsHTML = ' ';
	for (let tag in allTags) {
		const tagLinkHTML = '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '">' + tag + ' ' + '</a></li>';
		allTagsHTML  += tagLinkHtml;
		
	}
	tagList.innerHTML = templates.tagCloudLink(allTagsData);
}
generateTags();

function generateAuthors() {
	let allAuthors ={}
	const articles = document.querySelectorAll(optArticleSelector);
	for (let article of articles) {
		const titleList = article.querySelector(optArticleTagsSelector);
		let html = "";
		const authorTags = article.getAttribute("data-author");
		const authorLinkHTML = '<span>by </span><a href=#author-' + authorTags + '"><span>' + authorTags + '</span></a>';
		html = html + authorLinkHTML;
		if (!allAuthors[authorTags]) {allAuthors[authorTags] = 1
		} else {
			allAuthors[authorTags]++;
		}
		titleList.innerHTML = html;
	}
	const authorList = document.querySelector(optAuthorListSelector);
	const tagsParams = calculateTagsParams(allAuthors);
	let allAuthorsHTML = '';
	for(let author in allAuthors){
		const authorLinkHTML = '<li><a href= "#author-' + author + '">' +author + '(' +allAuthors[author] +')' +'</a></li>';
		allAuthorsHTML += authorLinkHTML
	}
	authorList.innerHTML = allAuthorsHTML;
}
generateAuthors();

function tagClickHandler(event) {
	/* prevent default action for this event */
	event.preventDefault();

	/* make new constant named "clickedElement" and give it the value of "this" */
	const clickedElement = this;
	/* make a new constant "href" and read the attribute "href" of the clicked element */
	const href = clickedElement.getAttribute("href");
	/* make a new constant "tag" and extract tag from the "href" constant */
	const tag = href.replace("#tag-", "");
	/* find all tag links with class active */
	const tagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
	/* START LOOP: for each active tag link */
	for (let tagLink of tagLinks) {
		/* remove class active */
		tagLink.classList.remove("active");
		/* END LOOP: for each active tag link */
	}
	/* find all tag links with "href" attribute equal to the "href" constant */
	const tagLinksHref = document.querySelectorAll('a.[href="' + href + '"]');
	/* START LOOP: for each found tag link */
	for (let tagLinkHref of tagLinksHref) {
		/* add class active */
		tagLinkHref.classList.add("active");
		/* END LOOP: for each found tag link */
	}
	/* execute function "generateTitleLinks" with article selector as argument */
	generateTitleLinks('[data-tags~="' + tag + '"]');
}
function addClickListenersToTags() {
	/* find all links to tags */
	const allLinksToTags = document.querySelectorAll('a[herf^="#tag-"]');
	console.log(allLinksToTags);
	/* START LOOP: for each link */
	for (let link of allLinksToTags) {
		/* add tagClickHandler as event listener for that link */
		link.addEventListener("click", tagClickHandler);
		/* END LOOP: for each link */
	}
}
addClickListenersToTags();

function authorClickHandler(event) {
	event.preventDefault();
	const clickedElement = this;
	const href = clickedElement.getAttribute("href");
	console.log(href);
	const tag = href.replace("#author-", "");
	const authorLinks = document.querySelectorAll('a.active[href^=#author-"]');
	for (let authorLink of authorLinks) {
		authorLink.classList.remove("active");
	}
	const authorLinksHref = document.querySelectorAll('a[href="' + href + '"]');
	for (let authorLinkHref of authorLinksHref) {
		authorLinkHref.classList.add("active");
	}
	generateTitleLinks('[data-author="' + tag + '"]');
}
