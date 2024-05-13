/* 카테고리 */
var menuButton = document.getElementById('menubox-button');
var menuItems = document.getElementById('categories-boxwrapper');

menuButton.addEventListener('click', function() {
  var display = menuItems.style.display;
  if (display === 'none') {
    menuItems.style.display = 'block';
  } else {
    menuItems.style.display = 'none';
  }
});

/* 로그인토글 */
var loginButton = document.getElementById('loginasset-button');
var loginItems = document.getElementById('LoginToggle');

loginButton.addEventListener('click', function() {
  var display = loginItems.style.display;
  if (display === 'none') {
    loginItems.style.display = 'block';
  } else {
    loginItems.style.display = 'none';
  }
});