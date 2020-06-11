/******************************************
Treehouse FSJS Techdegree:
Project 2 - List Pagination and Filtering
BY: ERNESTO RAMOS
6/11/2020
ERNRAMOS1991@GMAIL.COM
******************************************
@PLEASE @REJECT @IF @NOT @EXCEEDS @EXPECTATIONS
******************************************/

/***
 * Refer to README for more info about this project.
***/

const listItems = document.querySelectorAll('.student-item');
const itemsPerPage = 10;

// Ensures only one set of page buttons ever appear on screen.
const removeExtraPagination = () => {
  const pagin = document.querySelectorAll('.pagination');
  if (pagin.length > 1) {
    for (let i = 1; i < pagin.length; i++) {
      const parent = document.querySelector('.page');
      parent.removeChild(pagin[i]);
    }
  }
}

// clears the page entirely
const clear = () => {
  removeExtraPagination();
  const warnPar = document.querySelector('.student-list')
  const warning = document.querySelector('.student-list p')
  if (warning) {
    warnPar.removeChild(warning);
  }
  const allChildren = document.querySelectorAll('.student-item');
  for (let i = 0; i < allChildren.length; i++) {
    const child = document.querySelector('.student-item');
    const parent = child.parentNode;
    parent.removeChild(child);
  }
  const studentItemsExist = document.querySelector('.student-item');
  if (studentItemsExist) {
    const parent = document.querySelector('.page');
    const child = document.querySelector('.pagination');
    parent.removeChild(child);
  }
};

// Dynamically create and append a search bar.
const search = () => {
  const searchDiv = document.createElement('div');
  const parent = document.querySelector('.page-header');
  searchDiv.className = 'student-search';
  parent.appendChild(searchDiv);
  const input = document.createElement('input');
  input.placeholder = 'Search by name...';
  searchDiv.appendChild(input);
  const button = document.createElement('button');
  button.textContent = 'Search';
  searchDiv.appendChild(button);
};

// If no matches are found by the search, include a message in the
// HTML to tell the user there are no matches.
const message = () => {
  const studentItemsExist = document.querySelector('.student-item');
  if (!studentItemsExist) {
    const ul = document.querySelector('.student-list');
    const p = document.createElement('p')
    p.textContent = "Oh no! Try a different name.";
    ul.appendChild(p);

    const parent = document.querySelector('.page');
    const child = document.querySelector('.pagination');
    parent.removeChild(child);
  }
}

// When user cuts text from input field this func resets the page
// cutting neither triggers 'keyup' nor 'click' events.
const onCut = () => {
  const inputField = document.querySelector('.student-search input');
  inputField.addEventListener('cut', (e) => {
    clear()
    showPage(listItems, 1);
  })
}

// When the "Search" button is clicked, or 'keyup' triggers, the list is
// filtered by student name for those that include the search value.
const dynamicSearch = (searchType, searchEvent, searchParent) => {
  searchType = document.querySelector(searchParent);
  searchType.addEventListener(searchEvent, (e) => {
    clear();
    for (let i = 0; i < listItems.length; i++) {
      const nameSearched = listItems[i]
      const anyStudentsName = nameSearched.querySelector('.student-details h3').innerText;
      const searchInput = document.querySelector('.student-search input').value;
      if (anyStudentsName.includes(searchInput)) {
        const studentListUL = document.querySelector('.student-list');
        studentListUL.appendChild(nameSearched);
      }
    }
  // pagination links based on how many search results are returned
    // remove pagination to add paginated search results
    const studentItemsExist = document.querySelector('.student-item');
    if (studentItemsExist) {
      const parent = document.querySelector('.page');
      const child = document.querySelector('.pagination');
      parent.removeChild(child);
    }
    // paginated search results
    const newList = [];
    const allChildren = document.querySelectorAll('.student-item');
    for (let i = 0; i < allChildren.length; i++) {
      newList.push(allChildren[i]);
    }
    if (e.key == "Backspace" && searchType.value == "") {
      clear()
      showPage(listItems, 1);
    }

    showPage(newList, 1);
    appendPageLinks(newList);
    removeExtraPagination();
  })
}

const showPage = (list, page) => {
  clear();
  /*
  Loop over items in the list parameter
  -- If the index of a list item is >= the index of the first
  item that should be shown on the page
  -- && the list item index is <= the index of the last item
  that should be shown on the page, show it
  */
  for (let i = 0; i < list.length; i++) {
    const startIndex = (page * itemsPerPage) - itemsPerPage;
    let endIndex = page * itemsPerPage;
    if (endIndex > list.length) {
      endIndex = list.length;
    }
    if (i >= startIndex && i < endIndex) {
      const parent = document.querySelector('.student-list');
      parent.appendChild(list[i])
    }
  }
  message();
  removeExtraPagination();
};

// adds pagination buttons to bottom of page
const appendPageLinks = (list) => {
  removeExtraPagination();
  // Determine how many pages are needed for the list by dividing the
  // total number of list items by the max number of items per page
  const pagesNeeded = Math.ceil(list.length / itemsPerPage);

  // Create a div, give it the “pagination” class, and append it to the .page div
  const div = document.createElement('div');
  div.className = 'pagination';
  const pageDiv = document.querySelector('.page');
  pageDiv.appendChild(div);

  // Add a ul to the “pagination” div to store the pagination links
  const ul = document.createElement('ul');
  div.appendChild(ul);

  // for every page, add li and a tags with the page number text
  for (let i = 0; i < pagesNeeded; i++) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = '#';
    a.textContent = i + 1;
    ul.appendChild(li);
    li.appendChild(a);
  }
  const a = document.querySelectorAll('.pagination ul li a');
  if (a.length > 0) {
    a[0].className = 'active';
  }

  // Add an event listener to each a tag. When they are clicked
  // call the showPage function to display the appropriate page
  for (let i = 0; i < a.length; i++) {
    a[i].addEventListener('click', (e) => {
      // Loop over pagination links to remove active class from all links
      for (let i = 0; i < a.length; i++) {
        a[i].className = "";
      }
      // Add the active class to the link that was just clicked.
      e.target.className = "active";
      pressed = document.querySelector('.active').textContent;
      // new page
      clear()
      showPage(list, pressed);
      removeExtraPagination();
    });
  }
};
search();
onCut();
showPage(listItems, 1);
appendPageLinks(listItems);


dynamicSearch('button', 'click', '.student-search button');
dynamicSearch('input', 'keyup', '.student-search input');
