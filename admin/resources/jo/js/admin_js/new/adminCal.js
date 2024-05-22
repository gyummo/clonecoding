/* alert */
document.addEventListener('DOMContentLoaded', function () {
    const alertBox = document.querySelector('#alertBox');
    const contentArea = document.querySelector('#content');
    alertBox?.classList.remove('alert__wrap-fixed');
    alertBox?.classList.add('alert__wrap');
    if (contentArea && alertBox) contentArea.prepend(alertBox);
});

$(function () {
    SADMIN_MENU_ALERT.openAlert();
});