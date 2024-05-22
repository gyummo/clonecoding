/*----------------------*/
document.addEventListener('DOMContentLoaded', function () {
    const alertBox = document.querySelector('#alertBox');
    const contentArea = document.querySelector('#content');
    alertBox?.classList.remove('alert__wrap-fixed');
    alertBox?.classList.add('alert__wrap');
    if (contentArea && alertBox) contentArea.prepend(alertBox);
});
/*----------------------*/
$(function () {
    SADMIN_MENU_ALERT.openAlert();
});
/*----------------------*/


/*----------------------*/
function searchPost() {
    var url = ADMIN_URL + "contents/post?";

    if ($('#postSearch2').val() === '' || $('#postSearch2').val() === undefined) {
        alert(getLocalizeString('설명_s을를입력하세요', getLocalizeString('설명_검색어', '', '검색어'), '%1 을(를) 입력하세요'));
        return false;
    }

    url += ('&keyword=' + $('#postSearch2').val());

    let event = '';
    const path = location.pathname.replace(/\/$/, '');

    if (path === '/admin/contents/post') {
        event = 'search_bo_content_post';
    } else if (path === '/admin/contents/map') {
        event = 'search_bo_content_map_item';
    } else if (path === '/admin/contents/calendar') {
        event = 'search_bo_content_calendar_item';
    } else if (path === '/admin/contents/gallery') {
        event = 'search_bo_content_gallery_item';
    }

    mixpanel.track(event, {
        'keyword': $('#postSearch2').val(),
        'site_code': SITE_CODE
    });

    url += ('&board_code=' + 'b202405169c294be1ca714');

    location.href = url;
}
/*----------------------*/


/*----------------------*/
$(function () {
    TABLE_LIST.init($('#UI_TABLE'));

    let board_code = 'b202405169c294be1ca714'; let board_type = 'post'; let base_url = '/admin/contents/post/?q=YToyOntzOjEwOiJib2FyZF9jb2RlIjtzOjIyOiJiMjAyNDA1MTY5YzI5NGJlMWNhNzE0IjtzOjk6ImlkeF9vcmRlciI7czo0OiJkZXNjIjt9'; let board_keyword = ``; let params = [board_code, board_type, base_url, board_keyword];        /**
         * 페이지 로드 시 첫번째 페이지(페이징을 통한 1page data)를 로드하고, 더 로드할 데이터의 여부도 같이 전달받습니다.
         **/
    let getMapListResult = adminContents.post.getPostList(params);

    if (getMapListResult.more) {
        adminContents.post.getPostList(params);
    }

    $('.card').scroll(function () {
        let scrollLocation = Math.floor((this.scrollTop / (this.scrollHeight - this.clientHeight)) * 100);

        if (getMapListResult.more && scrollLocation >= 70) {
            adminContents.post.getPostList(params);
        }
    });


    const btn = document.querySelector('.btn-select');
    const list = document.querySelector('.list-member');
    const mobile_card = document.querySelector('.mobile-card');
    const body = document.querySelector('body');
    let isOpen = false;

    $("#mobile-select-box").scroll(function () {
        let scrollLocation = Math.floor((list.scrollTop / (list.scrollHeight - list.clientHeight)) * 100);

        if (getMapListResult.more && scrollLocation >= 70) {
            adminContents.post.getPostList(params);
        }
    });

    if (btn) {
        btn.addEventListener('click', () => {
            mobile_card.classList.toggle('on');
            if (!isOpen) {
                isOpen = true;
            } else {
                isOpen = false;
            }
        });

        body.addEventListener('click', (e) => {
            if (isOpen && e.target.className !== 'btn-select') {
                mobile_card.classList.toggle('on');
                isOpen = false;
            }
        })
    }
});

$(document).ready(function () {
    $('.control-fixed').scrollToFixed({
    });
    adminContents.setChangeListSort('post', $("._sortable_list"));
});

function searchBoard() {

    let event = '';
    const path = location.pathname.replace(/\/$/, '');

    if (path === '/admin/contents/post') {
        event = 'search_bo_content_post_group';
    } else if (path === '/admin/contents/map') {
        event = 'search_bo_content_map_group';
    } else if (path === '/admin/contents/calendar') {
        event = 'search_bo_content_calendar_group';
    } else if (path === '/admin/contents/gallery') {
        event = 'search_bo_content_gallery_group';
    }

    // 게시판명 검색
    mixpanel.track(event, {
        'keyword': $('[name="board_keyword"]').val(),
        'site_code': SITE_CODE
    });

    return true;
}
/*----------------------*/
/*----------------------*/
$(window).on("keyup", function (e) {
    if ($.cocoaDialog.isOpen()) {
        $.cocoaDialog.modalControl(e);
    }
    return false;
});/*----------------------*/

/*----------------------*/
(function () {
    let body = document.body;
    let btn = document.querySelector('#toggle_button');
    let sidebar_mini_class = 'sidebar-mini';
    let user_sm_status = getCookie('sm_status');
    let window_width = window.innerWidth;
    setPrimarySideMenu();

    btn.addEventListener('click', handleToggleButton);
    btn.addEventListener('touch', handleToggleButton);

    //만약 사용자가 버튼을 누르지 않았을때만 이 이벤트 리스너를 사용할것임.
    window.onresize = () => {
        window_width = window.innerWidth;
        if (user_sm_status !== 'h' && user_sm_status !== 's') {
            resizeWindow(window_width)
        }
    }

    function handleToggleButton() {
        if (user_sm_status == 'h') {
            setSideMenu('show');
        } else {
            setSideMenu('hide');
        }
    }

    function resizeWindow(window_width) {
        if (window_width > 1280 || window_width < 991) {
            body.classList.remove(sidebar_mini_class);
        }
        //992~1279 일때
        else {
            body.classList.add(sidebar_mini_class)
        }
    }

    function setPrimarySideMenu() {
        if (window_width > 1280 && user_sm_status !== 'h' || window_width < 991) {
            body.classList.remove(sidebar_mini_class);
        }
        //992~1279 일때
        else if (window_width <= 1280 && window_width >= 991) {
            if (user_sm_status == 's') body.classList.remove(sidebar_mini_class);
            else body.classList.add(sidebar_mini_class)
        }
        else {
            body.classList.add(sidebar_mini_class)
        }
    }

    function setSideMenu(show) {
        if (show == "show") {
            setCookie('sm_status', 's', 1);
            body.classList.remove(sidebar_mini_class);
            user_sm_status = 's'
        }
        else {
            setCookie('sm_status', 'h', 1);
            body.classList.add(sidebar_mini_class);
            user_sm_status = 'h';
            // 사이드바 접기 버튼을 누른 순간에 바로 접힐 수 있도록 10ms동안 임시 클래스 추가로 hover 이벤트를 방지
            let fold_area = document.querySelector('#menubar ~ .fold_area');
            fold_area.classList.add('disable-hover');
            setTimeout(() => { fold_area.classList.remove('disable-hover') }, 10);
        }
    }

    $('._lang_button').off('click').on('click', function () {
        let that = this;
        if ($.cocoaStickerModal.isOpen()) {
            $.cocoaStickerModal.close();
        }
        $.cocoaStickerModal.open({
            target: that,
            id: 'langListModal',
            html: $('#langListOrigin').html(),
            width: '152px',
            bottom: 23,
            left: 21
        });
    });

    const $notificationButton = $('._gnb_notification_button');

    const interval = getNotifyBadgeInterval($notificationButton);
    const notifyHandler = getNotifyHandler();

    notifyHandler.setInterval(interval);

    interval.force();
    interval.start();

    $notificationButton.on('click', function () {
        notifyHandler.toggleModal(interval);
    });
})();

/*----------------------*/

/*----------------------*/
window.addEventListener('load', () => {
    var svShowAnalyticsTooltip = 'Y';

    if (svShowAnalyticsTooltip === 'Y') {
        var isClosed = false;

        var isAppending = false;

        function isSnbFolded() {
            return document.body.classList.contains('sidebar-mini');
        }

        function isMobile() {
            return window.innerWidth < 993;
        }

        function isTooltipExist() {
            return document.querySelector('#analytics-tooltip') !== null;
        }

        function isStatMenuFolded() {
            return $('li[data-title="stat"] > ul').css('display') === 'none';
        }

        function analyticsFocus() {
            if (
                isClosed ||
                isSnbFolded() ||
                isMobile() ||
                isTooltipExist() ||
                isStatMenuFolded() ||
                isAppending
            ) {
                return;
            }

            scrollToMenuLi()
        }

        function scrollToMenuLi() {
            var menuLi = document.querySelector('li[data-title="stat_additional_service"]');

            var menuLiTop = menuLi.getBoundingClientRect().top;
            var toScroll = Math.max(0, menuLiTop - window.innerHeight) + 28 + 144;

            document.querySelector('.nano-content').scrollTo({ top: toScroll, behavior: 'smooth' })

            appendTooltip()
            appendPulse()
        }

        function appendTooltip() {
            isAppending = true;
            setTimeout(() => {
                var menuLi = document.querySelector('li[data-title="stat_additional_service"]');
                var menuLiTop = menuLi.getBoundingClientRect().top + 14;

                var focusElement = document.createElement('div');

                focusElement.id = 'analytics-tooltip'

                focusElement.style.position = 'fixed';
                focusElement.style.left = '224px'
                focusElement.style.top = menuLiTop + 'px';
                focusElement.style.transform = 'translate(12px, -50%)';
                focusElement.style.padding = '16px';
                focusElement.style.borderRadius = '12px';
                focusElement.style.backgroundColor = '#15181E';
                focusElement.style.width = "240px";

                var topText = document.createElement('p');

                topText.style.color = '#FFFFFF';
                topText.style.fontSize = '16px';
                topText.style.fontWeight = '700';
                topText.style.lineHeight = '24px';
                topText.style.marginBottom = '12px';
                topText.textContent = '부가 서비스 메뉴가 합쳐졌어요';

                focusElement.appendChild(topText);

                var middleText = document.createElement('p');

                middleText.style.color = '#FFFFFF';
                middleText.style.fontSize = '14px';
                middleText.style.lineHeight = '20px';
                middleText.style.marginBottom = '24px';
                middleText.innerHTML = '더 다양한 데이터 분석 인사이트를 <br/>만나보세요'

                focusElement.appendChild(middleText);

                var bottomButtonArea = document.createElement('div');

                bottomButtonArea.style.display = 'flex';
                bottomButtonArea.style.justifyContent = 'flex-end';
                bottomButtonArea.style.gap = '6px';

                var closeButton = document.createElement('button');
                closeButton.classList.add('tooltip-close-button');
                closeButton.textContent = '닫기';
                closeButton.id = 'analytics-tooltip-close';
                bottomButtonArea.appendChild(closeButton);

                var goButton = document.createElement('button');
                goButton.id = 'analytics-tooltip-go';
                goButton.classList.add('tooltip-go-button');
                goButton.textContent = '이동';
                bottomButtonArea.appendChild(goButton);

                focusElement.appendChild(bottomButtonArea);

                var arrowSvg = `<svg style="position: absolute;left: -6px;top: 50%;transform: translateY(-50%);" width="6" height="12" viewBox="0 0 6 12" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M0.707107 6.70711C0.316582 6.31658 0.316582 5.68342 0.707106 5.29289L6 -2.62268e-07L6 12L0.707107 6.70711Z" fill="#15181E"/>
									</svg>`

                focusElement.innerHTML += arrowSvg;

                document.body.appendChild(focusElement);

                document.querySelector('#analytics-tooltip-close').addEventListener('click', () => closeAnalyticsTooltip(() => {
                    isClosed = true;
                    remove();
                }));
                document.querySelector('#analytics-tooltip-go').addEventListener('click', () => closeAnalyticsTooltip(() => {
                    location.href = '/admin/stat/additional_service';
                }));

                isAppending = false;
            }, 500);
        }

        function closeAnalyticsTooltip(callback) {
            $.ajax({
                url: '/admin/ajax/menu/close_analytics_tooltip.cm',
                type: 'POST',
                complete: callback
            })
        }

        function appendPulse() {
            var menuLi = document.querySelector('li[data-title="stat_additional_service"]');

            var image = document.createElement('img');

            image.id = 'analytics-pulse';

            image.src = '/admin/img/menu_pulse.gif';

            image.style.position = 'absolute';
            image.style.left = '52px';
            image.style.top = '50%';
            image.style.transform = 'translateY(-50%)';
            image.style.width = '56px';
            image.style.height = '56px';
            image.style.pointerEvents = 'none';

            menuLi.appendChild(image);

        }

        function remove() {
            document.querySelector('#analytics-tooltip')?.remove();
            document.querySelector('#analytics-pulse')?.remove();
        }

        window.addEventListener('resize', () => {
            if (window.innerWidth < 993) remove()
            else {
                analyticsFocus();
            }
        })

        document.querySelector('#toggle_button').addEventListener('click', () => {
            if (isSnbFolded()) remove()
            else {
                analyticsFocus();
            }
        })

        $('.gui-folder').click(() => {
            if (isTooltipExist()) remove()
            else {
                setTimeout(() => {
                    analyticsFocus();
                }, 500);
            }
        })

        document.querySelector('.nano-content').addEventListener('scroll', () => {
            var tooltip = document.querySelector('#analytics-tooltip')

            if (tooltip !== null) {
                var top = document.querySelector('li[data-title="stat_additional_service"]').getBoundingClientRect().top

                if (top === 0) {
                    remove()
                    return
                }

                tooltip.style.top = top + 14 + 'px';
            }
        })

        analyticsFocus();
    }
})



/*----------------------*/

mixpanel.init('a4939111ea54962dbf95fe89a992eab3', { debug: false });
mixpanel.identify('M2022120722883bb351d7e');
MIXPANEL.init();
/*----------------------*/
