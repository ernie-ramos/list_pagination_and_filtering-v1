/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

/**
 * @const {DOM elemebt} listItem - Stores the student list_item elements in the
 *                                 student list.
 * @const {num} numItems - Stores the number of items to show on each “page”,
 *                         which is 10.
 */
const listItem = document.querySelectorAll('li');
const numItems = 10;

/* credit for this beautiful code: Robert Manolis - Student Success Specialist, Treehouse */
const createEl = el => document.createElement(el);
const createAndAppendEl = (parent, child) => {
  const chil = document.createElement(child);
  parent.appendChild(chil);
  return chil
}

const clearPage = () => {
  const ul = document.querySelector('.student-list');
  const liOnCurrentPage = document.querySelectorAll('.student-list li');
  // erases all items from current page
  for (var i = 0; i < liOnCurrentPage.length; i++) {
    const li = liOnCurrentPage[i];
    ul.removeChild(li)
  }
};
const appendToPage = (list, startIndex, endIndex) => {
  // appends new items
  const ul = document.querySelector('.student-list');
  for (var i = 0; i < endIndex; i++) {
    if (i >= startIndex && i < endIndex) {
      const li = list[i];
      ul.appendChild(li);
    }
  }
};
/**
 * The showPage function hides all of the items in the list except for the ten
 * you want to show.
 *
 * @par {list} list - The list parameter to represent the actual list of
 *                    students that you’ll pass in as an argument later
 *                    when you call this function.
 * @par {num} page - The page parameter represents the page number that you’ll
 *                   pass in as an argument later when you call this function.
 * @const {num} startIndex - The start index of the list items to be displayed on
 *                           the given page.
 * @const {num} endIndex - The end index of the list items to be displayed on
 *                         the given page.
 * @const {DOM element} li - <li> elements that have been filtered by index.
 * @const {DOM element} ul - Parent of li for hiding all and showing desired items.
 * @if {i} li - Using the index, display any list item with an index that is
 *              greater than or equal to the start index variable and less than
 *              the end index variable.
 */
function showPage(list, page) {
  const startIndex = (page * numItems) - numItems;
  let endIndex = page * numItems;
  if (endIndex > list.length) {
    endIndex = list.length;
  }

  const ul = document.querySelector('.student-list');

  clearPage();
  appendToPage(list, startIndex, endIndex);

};

/**
 * The appendPageLinks function generates, appends, and adds
 * functionality to the pagination buttons.
 *
 * @par {list} list - The list parameter represents the actual list of
 *                    items that you’ll pass in as an argument later
 *                    when you call this function.
 * @var {num} startIndex - The start index of the list items to be displayed on
 *                         the given page.
 * @var {num} endIndex - The end index of the list items to be displayed on
 *                       the given page.
 * @var {DOM element} li - <li> elements that have been filtered by index.
 * @var {DOM element} ul - Parent of li for hiding all and showing desired items.
 * @if {i} li - Using the index, display any list item with an index that is
 *              greater than or equal to the start index variable and less than
 *              the end index variable.
 */
function appendPageLinks(list) {
  const pageDiv = document.querySelector('.page')
  const pagesNeeded = Math.ceil(list.length / numItems);


  const appendToPage = createAndAppendEl(pageDiv, 'div');
  const divsInMainDiv = pageDiv.querySelectorAll('div');
  const paginationDiv = divsInMainDiv[divsInMainDiv.length - 1];
  paginationDiv.className = "pagination";

  const appendToDiv = createAndAppendEl(appendToPage, 'ul');
  for (var i = 0; i < pagesNeeded; i++) {
    const appendToUl = createAndAppendEl(appendToDiv, 'li');
    const appendToLi = createAndAppendEl(appendToUl, 'a');

    const aSelector = paginationDiv.querySelectorAll('a');
    aSelector[i].href = "#";
    const aActive = paginationDiv.querySelector('a');
    aActive.className = "active";
    aSelector[i].textContent = i + 1;
    aSelector[i].addEventListener('click', (e) => {
      const aSelector = paginationDiv.querySelectorAll('a');
      for (var i = 0; i < aSelector.length; i++) {
        aSelector[i].className = "";
      }
      e.target.className = "active";
      const page = parseInt(e.target.textContent);
      showPage(list, page);
    });
  }
}


/*
create a form and a button

as the form is being typed into (at keyUp event) search
the entire listItem for the content of the form

when the button is pressed search listItem for then
content of the form

if there's no result say No Results Found

<div class="student-search">
  <input placeholder="Search for students...">
  <button>Search</button>
</div>

*/

const searchComponent = (list) => {
  showPage(list, 1);
  appendPageLinks(list);
  const pagesNeeded = Math.ceil(list.length / numItems);
  const pageHeader = document.querySelector('.page-header');
  const searchCompsDiv = createAndAppendEl(pageHeader, 'div');
  searchCompsDiv.className = "student-search";
  const searchCompsInput = createAndAppendEl(searchCompsDiv, 'input');
  searchCompsInput.placeholder = "Search by name...";
  // const searchCompsButton = createAndAppendEl(searchCompsDiv, 'button');
  // searchCompsButton.textContent = "Search";

  searchCompsInput.addEventListener('keyup', (e) => {
    clearPage();
    const ul = document.querySelector('.student-list');
    for (var i = 0; i < list.length; i++) {
      const studentName = list[i].querySelector('.student-details h3').innerText;
      const searchInput = searchCompsInput.value;
      if (studentName.includes(searchInput)) {
        if (document.querySelector('.student-list p')) {
          ul.removeChild(document.querySelector('.student-list p'));
        }
        showPage(list, pagesNeeded);
      }
    }
  })
  searchCompsInput.addEventListener('keyup', (e) => {
    const ul = document.querySelector('.student-list');
    const li = ul.querySelectorAll('.student-item');
    const pageDiv = document.querySelector('.page');
    const paginationButtons = document.querySelector('.pagination');
    const message = document.querySelectorAll('.student-list p');
    if (li.length == 0 && message.length == 0) {
      const p = createEl('p');
      p.innerText = "Uh-oh! Try another name!";
      ul.appendChild(p);
      // pageDiv.removeChild(paginationButtons);
    }
  })
};

searchComponent(listItem);
