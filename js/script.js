const liItems = document.querySelectorAll('.student-item');
const itemsPerPage = 10;

const app = {
  clear: () => {
    const allChildren = document.querySelectorAll('.student-item');
    for (var i = 0; i < allChildren.length; i++) {
      const child = document.querySelector('.student-item');
      const parent = child.parentNode;
      parent.removeChild(child);
    }
  },
  createElWithAttrProp: (arr) => {
    const element = document.createElement(arr[0]);
    element[arr[1]] = arr[2];
    return element
  },
  appendEl: (parent, child) => {
    parent.appendChild(child);
  },
  searchBar: (parent, divProp, divAttr, inpProp, inpAttr) => {
    const par = document.querySelector(parent);
    const searchDiv = app.createElWithAttrProp(['div', divProp, divAttr]);
    app.appendEl(par, searchDiv);
    const searchInput = app.createElWithAttrProp(['input', inpProp, inpAttr]);
    app.appendEl(searchDiv, searchInput);
    return searchInput
  },
  searchFunction: () => {
    const search = app.searchBar('.page-header', 'className', 'student-search', 'placeholder', 'Search by name...' );
    search.addEventListener('keyup', (e) => {
      app.clear();
      for (var i = 0; i < liItems.length; i++) {
        const studentName = liItems[i].querySelector('.student-details h3').innerText;
        const searchInput = search.value;
        if (studentName.includes(searchInput)) {
          const parent = document.querySelector('.student-list');
          app.appendEl(parent, liItems[i]);
        }
      }
      if (document.querySelector('.student-item')) {
        const par = document.querySelector('.page')
        const chi = document.querySelector('.pagination')
        par.removeChild(chi)
      }
      const newList = [];
      const allChildren = document.querySelectorAll('.student-item');
      for (var i = 0; i < allChildren.length; i++) {
        newList.push(allChildren[i]);
      }
      app.pagination(newList);
    })
  },
  pagination: (list) => {
    const page = Math.ceil(list.length / itemsPerPage);
    const par = document.querySelector('.page');
    const div = app.createElWithAttrProp(['div', 'className', 'pagination']);
    const ul = document.createElement('ul');
    app.appendEl(par, div);
    app.appendEl(div, ul);
    for (var i = 1; i <= page; i++) {
      const li = document.createElement('li');
      const a = app.createElWithAttrProp(['a', 'href', "#"]);
      a.textContent = i;
      a.className = '';
      const liParent = document.querySelector('.pagination ul');
      app.appendEl(liParent, li);
      app.appendEl(li, a);
    }
    const a = document.querySelectorAll('.pagination ul li a');
    a[0].className = 'active';
    let pressed = '';
    for (var i = 0; i < a.length; i++) {
      a[i].addEventListener('click', (e) => {
        app.clear()
        for (var i = 0; i < a.length; i++) {
          a[i].className = "";
        }
        e.target.className = "active";
        pressed = document.querySelector('.active').textContent;
        app.listItems(list, pressed);
      });
    }
  },
  appendToPage: (list, startIndex, endIndex) => {
    const ul = document.querySelector('.student-list');
    for (var i = 0; i < endIndex; i++) {
      if (i >= startIndex && i < endIndex) {
        const li = list[i];
        ul.appendChild(li);
      }
    }
  },
  listItems: (list, pressed = 1) => {
    for (var i = 0; i < pressed; i++) {
      let startIndex = (pressed * itemsPerPage) - itemsPerPage;
      let endIndex = pressed * itemsPerPage;
      if (endIndex > list.length) {
        endIndex = list.length;
      }
      app.appendToPage(list, startIndex, endIndex);
    }
  },
  run: () => {
    app.clear();
    const search = app.searchFunction();
    const items = app.listItems(liItems);
    const pagination = app.pagination(liItems);

  }
};
app.run()
