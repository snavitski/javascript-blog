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
	optCloudClassPrefix = "tag-size",
	optAuthorListSelector = ".author-name";

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
	const classNumber = Math.floor(percetage * (optCloudClassCount - 1) + 1);
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
		const tagLinks = article.querySelectorAll(".list");
		console.log(tagLinks);
	}
	const tagList = document.querySelector(".tags");
	//tagList.innerHTML = allTags.join(' ');
	const tagsParams = calculateTagsParams(allTags);
	const allTagsData = { tags: [] };
	let allTagsHTML = " ";
	for (let tag in allTags) {
		allTagsData.tags.push({
			tag: tag,
			count: allTags[tag],
			className: calculateTagsClass(allTags[tag], tagsParams),
		});
	}
	tagList.innerHTML = templates.tagCloudLink(allTagsData);
}
generateTags();

function generateAuthors() {
	/* [NEW] create a new variable allAuthors with an empty object */
	let allAuthors = {};
	/* find all articles */
	const articles = document.querySelectorAll(optArticleSelector);
	/* START LOOP: for every article: */
	for (let article of articles) {
		/* find tags wrapper */
		const titleList = article.querySelector(optArticleAuthorSelector);
		/* make html variable with empty string */
		let html = "";
		/* get tags from data-author attribute */
		const authorTags = article.getAttribute("data-author");
		//console.log(authorTags);
		/* generate HTML of the link */
		//const authorlinkHTML = '<span>by </span><a href="#author-' + authorTags + '"><span>' + authorTags + '</span></a>';
		const authorLinkHTMLData = { id: authorTags, title: authorTags };
		const authorLinkHTML = templates.authorLink(authorLinkHTMLData);
		//console.log(taglinkHTML)
		/* add generated code to html variable */
		html = html + authorLinkHTML;
		/* [NEW] check if this link is NOT already in allAuthors */
		if (!allAuthors[authorTags]) {
			/* [NEW] add tag to allAuthors object */
			allAuthors[authorTags] = 1;
		} else {
			allAuthors[authorTags]++;
		}
		/* insert HTML of all the links into the tags wrapper */
		titleList.innerHTML = html;
		//console.log(titleList);
		/* END LOOP: for every article: */
	}
	/* [NEW] find list of tags in right column */
	const authorList = document.querySelector(optAuthorListSelector);
	/* [NEW] create variable for all links HTML code */
	const tagsParams = calculateTagsParams(allAuthors);
	const allAuthorsData = { authors: [] };
	/* [NEW] START LOOP: for each tag in allAuthors: */
	for (let author in allAuthors) {
		/* [NEW] generate code of a link and add it to allAuthorsHTML */
		//const authorlinkHTML =  '<li><a href= "#author-' + author + '">' + author + ' (' + allAuthors[author] + ') ' + '</a></li> ';
		//console.log('authorlinkHTML:', authorlinkHTML)
		allAuthorsData.authors.push({
			author: author,
			count: allAuthors[author],
		});
		/* [NEW] END LOOP: for each tag in allTags: */
	}
	/*[NEW] add HTML from allAuthorsHTML to tagList */
	authorList.innerHTML = templates.authorCloudLink(allAuthorsData);
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
