/* 메뉴 토글*/
var menuButton = document.querySelector('#catebutton');
var menuItems = document.querySelector('#cateToggle');

/* 메뉴 버튼 클릭시 카테고리 토글*/
menuButton.addEventListener('click', function() {
  var display = menuItems.style.display;
  if (display === 'none') {
    menuItems.style.display = 'block';
  } else {
    menuItems.style.display = 'none';
  }
});


/* 로그인 토글*/
var LoginButton = document.querySelector('#userName');
var LoginItems = document.querySelector('#LoginToggle');

LoginButton.addEventListener('click', function() {
  var display = LoginItems.style.display;
  if (display === 'none') {
    LoginItems.style.display = 'block';

    /* 클릭 이벤트시 클릭한 위치를 좌표 설정 */
    LoginItems.style.position = 'fixed';
    LoginItems.style.left = event.clientX + 'px';
    LoginItems.style.top = event.clientY + 'px';
  } else {
    LoginItems.style.display = 'none';
  }
});