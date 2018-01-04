/**
 * @description Assign value to attribute of html elements.
 * @param {string} identity - Class, ID , tag name
 * @param {string} attribute - Attribute to be set
 * @param {string} value - Value of the Attribute
 */
function setAttribute(identity, attribute, value) {
	document.querySelector(identity).setAttribute(attribute, value);
}

/**
 * @description Assign innerHTML of elements.
 * @param {string} identity - Class, ID , tag name
 * @param {string} text - html or text
 */
function setText(identity, text) {
	document.querySelector(identity).innerHTML = text;
}

function addPopupCloseEvent() {
	document.querySelectorAll(".close").forEach(function(btns) {
		btns.addEventListener('click', closePopup, false);
	});
}

/**
* @description Shows the popup. The if else conditon check if the popup is
required for displaying projects or user info. Accordingly the info is
displayed in popup
*/
function showPopup() {
	let dataid = this.getAttribute("data-id");
	let heading = "",
		image = "",
		body = "",
		links = "";
	//for user info
	if (isNaN(dataid)) {
		heading = "About";
		body = `<h2>${resume.basics.name}</h2>` +
			`<p>${resume.basics.label}</p>` +
			`<p>${resume.basics.summary}</p>`;
		resume.basics.profiles.forEach(function(profile) {
			links += `<a target="_blank" href="${profile.url}">${profile.network}</a>`;
		});
		//for project info
	} else {
		let project = resume.projects[dataid];
		heading = project.title;
		image = `<img class="popup-img" src="${project.picture}" alt="popup-img">`;
		body = `<hr><p>${project.summary}</p>` +
			`<a href="${project.source}">Source Code</a>`;
	}
	let html = `<div class="popup-header">` +
		`<h2 id="popup-name">${heading}</h2>` +
		`<i class="close material-icons">&#xE5CD;</i></div>` +
		`<div class="popup-body">${image}${body}${links}</div>` +
		`<div class="popup-footer">` +
		`<button type="button" class="close close-btn" >Close</button></div>`;
	setText(".popup", html);
	//displaying popup
	document.querySelector(".popup-container").style.visibility = "initial";
	document.querySelector(".popup").style.top = "50%";
	//adding event listeners for closing popup
	addPopupCloseEvent();

}

/**
 * @description Close the popup.
 */
function closePopup() {
	let popupContainer = document.querySelector(".popup-container");
	let popup = document.querySelector(".popup");
	popup.style.top = "-1000px";
	popupContainer.style.visibility = "hidden";
}

/**
* @description Adds event listener for onclick events on project cards
and user display picture.
*/
function addEvents() {
	document.querySelectorAll(".proj").forEach(function(el) {
		el.addEventListener('click', showPopup, false);
	});
	document.querySelector(".profile-pic-container").addEventListener(
		'click', showPopup, false);
}

/**
* @description Display all projects present in the resume.js file.
* @param {object} project - project object contains details like title, link,
discreption etc.
* @return {string} String consisting of all the project info embedded in tags.
*/
function createProjectHTML(project) {
	let projectHTML = `<div class = "project"><div class = "card">` +
		`<div class ="proj" data-id = "${resume.projects.indexOf(project)}">` +
		`<div class = "shaper">` +
		`<img src = "${project.picture}" alt = "${project.title}">` +
		`</div><h2 class = "project-name">${project.title}</h2></div>` +
		`<a  href = "${project.source}">Source Code</a></div></div>`;
	return projectHTML;
}

/**
 * @description Display all projects present in the resume.js file.
 */
function displayAllProjects() {
	let projectHTML = "";
	resume.projects.forEach(function(project) {
		projectHTML += createProjectHTML(project);
	})
	setText(".project-container", projectHTML);
}

/**
 * @description Uncomment the below function to change user info dynamically,
 dont forget to make changes in resume.js file.Also uncomment the function call
 */
/*
function setProfileInfo(){
  let basicInfo = resume.basics;
  setAttribute(".logo", "src", basicInfo.logo);
  setText(".name", basicInfo.name);
  setText(".label", basicInfo.label);
  setAttribute(".wallpaper-pic", "src", basicInfo.wallpaper);
  setAttribute(".profile-pic", "src", basicInfo.picture);
}
*/

function main() {
	//setProfileInfo();
	displayAllProjects();
	addEvents();
}

main();
