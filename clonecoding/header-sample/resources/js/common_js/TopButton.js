$(document).ready(function () {
    $(window).scroll(function () {

        if ($(this).scrollTop() > 100) {
            $('#quickbtn').fadeIn();
        }
        else {
            $('#quickbtn').fadeOut();
        }

    });

    $('#quickbtn').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 400);
        return false;
    });

});