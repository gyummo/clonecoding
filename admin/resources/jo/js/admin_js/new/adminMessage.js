
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
$(function () {
    var $datetimepicker = $('#datetimepicker');
    $("#content").find("input[name='is_booking']").off("click.is_booking").on("click.is_booking", function () {

        $(this).prop("checked") ? $datetimepicker.data("DateTimePicker").enable() : $datetimepicker.data("DateTimePicker").disable();
    });

    var date_option = {
        dayViewHeaderFormat: 'YYYY MMMM',
        locale: getMomentLangCode(ADMIN_LANG_CODE),
        icons: {
            time: 'zmdi zmdi-time',
            date: 'zmdi zmdi-calendar',
            up: 'zmdi zmdi-chevron-up',
            down: 'zmdi zmdi-chevron-down',
            previous: 'zmdi zmdi-chevron-left',
            next: 'zmdi zmdi-chevron-right',
            today: 'glyphicon glyphicon-screenshot',
            clear: 'glyphicon glyphicon-trash'
        },
        format: 'YYYY/MM/DD HH:mm'
    };
    $datetimepicker.datetimepicker(date_option);
    $datetimepicker.data('DateTimePicker').disable();
});
var alarm_img_tmp_idx = 0;
var alarm_img = "";

function changeAlarmCheckAll(chk) {
    $("input.alarm_group_list").prop('checked', chk);
    changeCrmGroup(chk);
    changeAlarmCheck();
}

function changeCrmGroup(check) {
    if (check) {
        $("input.alarm_group_list_crm").prop('disabled', true);
        $("input.alarm_group_list_crm").prop('checked', false);
    } else {
        $("input.alarm_group_list_crm").prop('disabled', false);
    }
}

function changeAlarmCheck() {
    var group_cnt = $("input.alarm_group_list").length - $("input.alarm_group_list_crm").length;
    var chk_cnt = $("input.alarm_group_list:checked").length;
    var crm_cnt = $("input.alarm_group_list_crm:checked").length;
    var sel_msg = '';
    if (chk_cnt == 0) {
        sel_msg = LOCALIZE_ADMIN.설명_선택하지않음();
        ['alarm_group_list_group', 'alarm_group_list_nogroup', 'alarm_group_list_guest', 'alarm_group_list_all', 'alarm_group_list_crm'].forEach(function (item) {
            $("input." + item).prop('checked', false);
            $("input." + item).prop('disabled', false);
        });
    } else if (chk_cnt == group_cnt) {
        $('input.alarm_group_list_all').prop('checked', true);
        sel_msg = LOCALIZE_ADMIN.설명_전체회원();
    } else {
        var sel_msg_list = [];
        if ($("input.alarm_group_list_nogroup").prop('checked')) sel_msg_list.push(LOCALIZE_ADMIN.설명_그룹없음());
        if ($("input.alarm_group_list_guest").prop('checked')) sel_msg_list.push(LOCALIZE_ADMIN.설명_비회원());
        chk_cnt = $("input.alarm_group_list_group:checked").length;
        var no_group_chk_cnt = $("input.alarm_group_list_nogroup:checked").length;
        var guest_chk_cnt = $("input.alarm_group_list_guest:checked").length;
        // if (chk_cnt>0) sel_msg_list.push(LOCALIZE_ADMIN.설명_n개그룹(chk_cnt));

        if (chk_cnt > 0 || no_group_chk_cnt > 0 || guest_chk_cnt > 0) {
            sel_msg_list.push(LOCALIZE_ADMIN.설명_n개그룹(chk_cnt));
            changeCrmGroup(true)
        } else {
            changeCrmGroup(false)
        }

        if (crm_cnt > 0) {
            ['alarm_group_list_group', 'alarm_group_list_nogroup', 'alarm_group_list_guest', 'alarm_group_list_all'].forEach(function (item) {
                $("input." + item).prop('disabled', true);
                $("input." + item).prop('checked', false);
            });
            sel_msg_list.push(LOCALIZE_ADMIN.설명_n개그룹(crm_cnt));
        }

        $('input.alarm_group_list_all').prop('checked', false);
        sel_msg = sel_msg_list.join(',');
    }
    $('#alarm_group_list_selected').text(sel_msg);
}

function send_alarm() {
    var $content = $('#content');
    var subject = $("#alarm_subject").val();
    var content = $("#alarm_content").val();
    var url = $("#alarm_url").val();
    var all_send = $('input.alarm_group_list_all').prop('checked');
    var is_booking = $content.find("input[name='is_booking']").prop('checked');
    var booking_time = $content.find("input[name='booking_time']").val();

    var alarm_token = $("#alarm_token").val();
    var alarm_token_key = $("#alarm_token_key").val();

    var receiver = [];
    $('input.alarm_group_list:checked').each(function (no, obj) {
        if (obj.value.includes('crm-')) {
            receiver.push({ 'type': 'crm', 'value': obj.value.replace('crm-', '') });
        } else if (obj.value == 'nogroup')
            receiver.push({ 'type': 'group', 'value': '' });
        else if (obj.value == 'guest')
            receiver.push({ 'type': 'guest', 'value': '' });
        else
            receiver.push({ 'type': 'group', 'value': obj.value });
    });

    adminMember.sendPush(receiver, subject, content, url, alarm_img_tmp_idx, alarm_img, all_send, is_booking, booking_time, alarm_token, alarm_token_key);
}



function remove_alarm_img() {
    alarm_img_tmp_idx = 0;
    $("#alarm_img_group").hide();
}

$(function () {
    $('#fileupload_img').setUploadImage({
        url: '/admin/ajax/upload_image.cm',
        formData: { temp: 'Y', target: 'alarm' }
    }, function (res, data) {
        $.each(data, function (e, tmp) {
            if (tmp.url != '') {
                $("#alarm_img_group").show();
                $('#alarm_img').attr('src', CDN_UPLOAD_URL + tmp.url);
                alarm_img = tmp.url;
                alarm_img_tmp_idx = tmp.tmp_idx;
            } else {
                alert(tmp.error);
            }
        })

    });

    var $alarm_content = $("#alarm_content");
    autosize($alarm_content);

    $(function () {
        $alarm_content.keyup(function (e) {
            var content = $(this).val();
            $('#chars_app_title').html(getByteLength(content) + '/2500');
        });
    });
});
/*----------------------*/


/*----------------------*/
function delete_alarm(alarm_idx, type) {
    if (!confirm(LOCALIZE_ADMIN.설명_해당알림을삭제하시겠습니까())) return false;
    $.ajax({
        type: 'POST',
        data: { 'alarm_idx': alarm_idx, 'type': type },
        url: ('/admin/ajax/alarm/delete_alarm.cm'),
        dataType: 'json',
        async: false,
        cache: false,
        success: function (obj) {
            if (obj.msg == "SUCCESS") {
                // mixpanel 알림 트래킹
                type === 'default' ? mixpanel.track('complete_bo_member_message_notification_sent_item_delete', { 'site_code': SITE_CODE }) : mixpanel.track('complete_bo_member_message_notification_scheduled_item_cancel', { 'site_code': SITE_CODE });
                window.location.reload();
            } else {
                alert(obj.msg);
            }
        }
    });
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
