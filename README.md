/******************************************
Treehouse FSJS Techdegree:
Project 2 - List Pagination and Filtering
BY: ERNESTO RAMOS
6/11/2020
ERNRAMOS1991@GMAIL.COM
******************************************
@PLEASE @REJECT @IF @NOT @EXCEEDS @EXPECTATIONS
******************************************/

#List pagination project-
- Designed to display 10 items per page and provide navigation to jump to a list of more items. There is also a dynamic search bar which filters and paginates results in real-time.

#Program Flow-
- search(); creates the HTML for the search bar and button
- onCut(); captures edge cases where users use cut to erase contents in the search bar. Since cut does not trigger keyup or click, it is necessary.
- showPage(listItems, 1); this is the "default" state of the app. Dividing the list of items in the HTML into pages with 10 items, displaying page 1 by default.
- appendPageLinks(listItems); creates the page links and the addEventListeners that make clicking on the links possible.

This covers the basic functionality of the app.

- dynamicSearch(searchType, searchEvent, searchParent); was written with the purpose of listening for an event (ideally keyup or click) and generating a list containing the items that match the search query. This search result is then passed to showPage and appendPageLinks as if the program was running for the first time.

#Room for improvements
- It bothers me that I need removeExtraPagination(), I feel like I should be able to extrapolate the pagination (separating the HTML creation part of appendPageLinks from the addEventListener part) and the link clicking so new buttons aren't appended every time the function is called. However, diving this deep into optimizing this code is beyond the scope of my current skillset and I have indulged myself with far too much time for this project.
