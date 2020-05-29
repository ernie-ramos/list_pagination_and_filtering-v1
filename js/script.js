/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

/**
 * @const {DOM elemebt} listItem - Stores the student list_item elements in the
 *                               student list.
 * @const {num} numItems - Stores the number of items to show on each “page”,
 *                       which is 10.
 */
const listItem = document.querySelectorAll('li');
const numItems = 10;

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
 *                         the given page.
 * @const {num} endIndex - The end index of the list items to be displayed on
 *                       the given page.
 * @const {DOM element} li - <li> elements that have been filtered by index.
 * @const {DOM element} ul - Parent of li for hiding all and showing desired items.
 * @if {i} li - Using the index, display any list item with an index that is
 *              greater than or equal to the start index variable and less than
 *              the end index variable.
 */
function showPage(list, page) {
  const startIndex = (page * numItems) - numItems;
  const endIndex = page * numItems;

  for (var i = 0; i < list.length; i++) {
    const li = list[i];
    const ul = li.parentNode;
    ul.removeChild(li)

    if (i >= startIndex && i < endIndex) {
      ul.appendChild(li);
    }
  }
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

  /* credit for this beautiful code: Robert Manolis - Student Success Specialist, Treehouse
   * Helper funcs */
  const createEl = el => document.createElement(el);
  const createAndAppendEl = (parent, child) => {
    const chil = document.createElement(child);
    parent.appendChild(chil);
    return chil
  }

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
      const page = e.target.textContent;
      console.log(list);
      showPage(list, pages);
    });


  }

}
showPage(listItem, 1);
appendPageLinks(listItem);



// Remember to delete the comments that came with this file, and replace them with your own code comments.
