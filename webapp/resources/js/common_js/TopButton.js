$(document).ready(function () {
    $(window).scroll(function () {
        /* 스크롤이 100이상 발생하면 Top버튼이 나타남 */
        if ($(this).scrollTop() > 100) {
            $('#quickbtn').fadeIn();
        }
        /* 스크롤이 100이하로 내려가면 Top버튼이 사라짐 */
        else {
            $('#quickbtn').fadeOut();
        }

    });

    $('#quickbtn').click(function () {
        /* Top버튼 클릭시 맨위로 이동 */
        $('html, body').animate({ scrollTop: 0 }, 400);
        return false;
    });

});