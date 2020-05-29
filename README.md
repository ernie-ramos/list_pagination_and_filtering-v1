#Unit 2 Project: List Pagination and Filtering

#ReadMe to-do:
-A description of the project in your own words
-The skills, techniques and process used to complete the project
-If you’ve attempted to earn an “Exceeds Expectations” grade, list the “Extra Credit” features you added.

# PROGRESSIVE ENHANCEMENT

#Core Principles
The progressive enhancement strategy consists of the following core principles:

Basic content should be accessible to all web browsers
Basic functionality should be accessible to all web browsers
Sparse, semantic markup contains all content
Enhanced layout is provided by externally linked CSS
Enhanced behavior is provided by unobtrusive, externally linked JavaScript
End-user web browser preferences are respected


#Pseudo for Progressive Enhancement
if('querySelector' in document
  && 'localStorage' in window
  && 'addEventListener' in window) {
  // bootstrap the javascript application
}

#avoid disabling zoom
<meta name="viewport" content="width=device-width, initial-scale=1.0">

#use feature detection to ensure that you’re implementing with progressive enhancement in mind
if ('serviceWorker' in navigator) {
  // check to see if service worker API exists
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      // registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }).catch(function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}
