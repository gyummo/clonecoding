(function () {
    var customTooltipAllowList = $.fn.tooltip.Constructor.DEFAULTS.whiteList;
    customTooltipAllowList.table = [];
    customTooltipAllowList.thead = [];
    customTooltipAllowList.tbody = [];
    customTooltipAllowList.tr = [];
    customTooltipAllowList.td = ["rowspan", "colspan"];
    customTooltipAllowList.th = [];
    customTooltipAllowList.caption = [];
    customTooltipAllowList["*"].push("style");
})();

/*드롭다운 메뉴 설정*/
function determineDropDirection() {
    var $window = $(window);
    var window_height = $window.innerHeight();
    var window_scrolltop = $window.scrollTop();
    $(".dropdown-menu").each(function () {
        var $that = $(this);
        var prv_style = $that.attr("style");
        $that.css({
            visibility: "hidden",
            display: "block"
        });
        $that.parent().removeClass("dropup");
        /* 드롭다운 하단에 공간이 없을 경우 상단에 공간이 있다면 방향 전환 */
        if ($that.offset().top + $that.outerHeight() + 60 > window_height + window_scrolltop && $that.offset().top > $that.outerHeight() + 60) {

            $that.parent().addClass("dropup");
            $that.removeAttr("style");
        } else {
            $that.removeAttr("style");
            $that.attr("style", prv_style);
        }
    });
}

determineDropDirection();

$(window).scroll(determineDropDirection);
; const message_script_allow_domains = ['https://kginicis.imtest.me', 'http://app-v2.mp.imlocal.me', 'https://app-v2.mp.imlocal.me', 'https://app-v2.mp.imtest.me', 'https://app-v2.mp.imweb.me'];
window.addEventListener('message', function (event) {
    if (message_script_allow_domains.includes(event.origin)) { //허용 도메인 확인
        if (typeof event.data === 'object' && event.data !== null) { // 배열인지 확인
            if (typeof event.data.type === 'undefined') {
                return;
            }
            switch (event.data.type) {
                case 'call-channel-IO-api':
                    const { type, method, options } = event.data;

                    ChannelIO(method, ...Object.values(options || {}));
                    break;
                default:
                    return;
            }
        }
    }
});

(function () {
    const clarity = new ClarityScript();
    let project_id = null;
    let IS_DESIGNMODE = false;

    const { CLARITY_PROJECT_ID } = clarity;

    if (TEST_SERVER) {
        if (IS_DESIGNMODE) {
            project_id = CLARITY_PROJECT_ID.TEST_SERVER.DESIGNMODE;
        } else {
            project_id = CLARITY_PROJECT_ID.TEST_SERVER.ADMIN;
        }
    } else {
        if (IS_DESIGNMODE) {
            project_id = CLARITY_PROJECT_ID.LIVE_SERVER.DESIGNMODE;
        } else {
            project_id = CLARITY_PROJECT_ID.LIVE_SERVER.ADMIN;
        }
    }

    clarity.setClarityScript(project_id);
})();

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

$(function () {
    var tutorial_info = {};
    var tutorial_modal = '';
    var tutorial_resize = false;


    setTutorialModal();
    refreshCheckBarAll();
    $('._dashboard_tutorial ._skip').click(function () {
        var target = $(this).attr('data-target');
        var name = $('._dashboard_tutorial .dashboard_tutorial_card[data-type="' + target + '"] header').text();
        if (confirm(getLocalizeString('설명_n1의모든작업을완료처리하시겠습니까', name, '%1의 모든 작업을 완료처리 하시겠습니까?'))) {
            skipTutorialType(target);
        }
    });

    function carousel() {
        if ($(window).width() <= 992) {
            $('.dashboard_tutorial_container').owlCarousel({
                responsive: {
                    0: {
                        items: 1
                    }
                }
            });
        } else {
            var $dashboard_tutorial = $('.dashboard_tutorial_container');
            if ($dashboard_tutorial.data('owlCarousel')) {
                $dashboard_tutorial.trigger('destroy.owl.carousel').removeClass('owl-carousel').removeClass('owl-loaded');
                var dashboard_tutorial_inner = $dashboard_tutorial.find('.owl-stage-outer');
                $dashboard_tutorial.html(dashboard_tutorial_inner.html());
                setTutorialModal();
            }
        }
    }

    if ($('.dashboard_tutorial').css('display') !== 'none') {
        carousel()
    }

    $(window).resize(function () {
        if ($('.dashboard_tutorial').hasClass('fold')) return
        if (!tutorial_resize) {
            tutorial_resize = true;
            setTimeout(function () {
                tutorial_resize = false;
                var $dashboard_tutorial = $('.dashboard_tutorial_container');
                if ($(window).width() <= 992) {
                    if (!$dashboard_tutorial.data('owlCarousel')) {
                        $dashboard_tutorial.owlCarousel({
                            responsive: {
                                0: {
                                    items: 1
                                }
                            }
                        });
                    }
                } else {
                    if ($dashboard_tutorial.data('owlCarousel')) {
                        $dashboard_tutorial.trigger('destroy.owl.carousel').removeClass('owl-carousel').removeClass('owl-loaded');
                        var dashboard_tutorial_inner = $dashboard_tutorial.find('.owl-stage-outer');
                        $dashboard_tutorial.html(dashboard_tutorial_inner.html());
                        setTutorialModal();
                    }
                }
            }, 1000);
        }
    });

    function setTutorialModal() {
        $('._dashboard_tutorial ._check_list').click(function () {
            var target = $(this).attr('data-target');
            if (tutorial_modal === '') {
                $.ajax({
                    'type': 'POST',
                    'data': { 'shopping': 'Y', 'booking': 'N' },
                    'url': ('/admin/ajax/tutorial_guide.cm'),
                    'dataType': 'json',
                    'async': false,
                    'cache': false,
                    'success': function (res) {
                        if (res.msg === 'SUCCESS') {
                            tutorial_modal = $(res.modal_html);
                            var _tutorial_info = JSON.parse(res.tutorial_info);

                            _tutorial_info.ck_menu_seo.link = '/admin/config/seo'
                            _tutorial_info.ck_info.button = '설정 페이지로';
                            _tutorial_info.ck_info.description = '내 사이트 이름, 설명이 올바르게 입력되었는지<br/>확인하고 수정해 보세요.'
                            _tutorial_info.ck_design.button = '디자인 모드로';
                            _tutorial_info.ck_design.description = '메뉴 구성을 변경하고 필요한 요소를 추가하여<br/>디자인 작업을 시작하세요.';
                            _tutorial_info.ck_policy.button = '설정 페이지로';
                            _tutorial_info.ck_policy.description = '사이트 운영과 이용에 필요한 사항을 규정하고<br/>이용자 보호지침 안내를 설정하세요.';
                            _tutorial_info.ck_domain.button = '설정 페이지로';
                            _tutorial_info.ck_domain.description = '나만의 도메인은 내 사이트의 개성을 더하고<br/>차별화된 느낌을 방문자에게 선사할 수 있습니다.';
                            _tutorial_info.ck_product.button = '상품 페이지로';
                            _tutorial_info.ck_deliv.button = '설정 페이지로';
                            _tutorial_info.ck_pg.button = '신청 페이지로';
                            _tutorial_info.ck_pg.description = '신용카드, 가상계좌, 휴대폰 결제를 설정하여<br/>구매전환율을 높여보세요.';
                            _tutorial_info.ck_naver_pay.button = '신청 페이지로';
                            _tutorial_info.ck_naver_pay.description = '내 사이트에서도 복잡한 결제과정 없이<br/>네이버페이로 상품을 판매할 수 있어요!';
                            _tutorial_info.ck_booking.button = '상품 페이지로';
                            _tutorial_info.ck_holiday.button = '설정 페이지로';
                            _tutorial_info.ck_refund.button = '설정 페이지로';
                            _tutorial_info.ck_search_engine.description = '네이버, Google 등 검색엔진에 사이트를<br/>등록하여 방문자를 늘려보세요.';
                            _tutorial_info.ck_menu_seo.button = '설정 페이지로';
                            _tutorial_info.ck_menu_seo.description = '내 웹사이트의 검색 엔진을 최적화하여<br/>더 효과적으로 노출해보세요.';
                            _tutorial_info.ck_social_login.button = '설정 페이지로';
                            _tutorial_info.ck_social_login.description = '네이버, 카카오, Google, Facebook 소셜계정으로<br/>방문자가 편리하게 가입, 로그인을 설정해 보세요.';
                            _tutorial_info.ck_mail.button = '설정 페이지로';
                            _tutorial_info.ck_mail.description = '가입, 주문 등 자동화된 메일을 설정하여 방문자나<br/>운영자에게 알림을 보내보세요.'
                            _tutorial_info.ck_sms.button = '설정 페이지로';
                            _tutorial_info.ck_sms.description = '편리하게 주문상태 등을 알림받을 수 있도록<br/>SMS/알림톡을 설정해 보세요.'
                            _tutorial_info.ck_stat.button = '방문자 페이지로';
                            _tutorial_info.ck_stat.description = '내 사이트에서 활동한 방문자를 살펴보고<br/>인사이트를 얻으세요.';
                            _tutorial_info.ck_permission.button = '설정 페이지로';
                            _tutorial_info.ck_deposit_confirmation.button = '설정 페이지로';
                            _tutorial_info.ck_deposit_confirmation.description = '무통장입금 내역 확인 처리가 힘드시다면<br/>자동입금확인을 설정해 보세요.';
                            _tutorial_info.ck_chat.button = '설정 페이지로';
                            _tutorial_info.ck_chat.description = "온라인 고객과 대화하고 구매를 유도하여<br/>구매전환율을 높혀보세요.";
                            _tutorial_info.ck_app.button = '설정 페이지로';
                            _tutorial_info.ck_app.description = '내 사이트를 안드로이드 및 iOS로 만들어<br/>나만의 브랜딩을 구축해 보세요.';

                            tutorial_info = _tutorial_info;
                            openTutorialModal(target);
                        }
                    }
                });
            } else {
                openTutorialModal(target);
            }
        });
    }

    function openTutorialModal(target) {
        $('#cocoaSubModal').modal("hide");
        $.cocoaDialog.open({
            type: 'admin ', custom_popup: tutorial_modal, pc_width: 720, opened: function () {
                $('#tutorial_trackpad').TrackpadScrollEmulator();
                changeTutorial(target);
                refreshCheckBarAll();
                $('#cocoaModal').addClass('tutorial_guide_modal')
                $('.modal-backdrop').addClass('tutorial_guide_modal_backdrop')
                $('._tutorial_guide ._check_list').click(function () {
                    changeTutorial($(this).attr('data-target'));
                });
                $('.modal_close').html(`<svg class="btl bt-times" 
											xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"></svg>`);
            }
        });
    }

    function changeTutorial(target) {
        var $tutorial_guide = $('._tutorial_guide');
        if (!$tutorial_guide.find('._check_list[data-target="' + target + '"]').hasClass('active')) {
            $tutorial_guide.find('._check_list').removeClass('active');
            $tutorial_guide.find('._check_list[data-target="' + target + '"]').addClass('active');
            $tutorial_guide.find('._img').attr('src', tutorial_info[target].img);
            $tutorial_guide.find('._name').text(tutorial_info[target].name);

            /**
             * 이미 건너뛰기 처리한 항목은 건너뛰기 버튼을 숨김
             */
            if (
                $tutorial_guide.find('._check_list[data-target="' + target + '"]').hasClass('checked')
            ) {
                $tutorial_guide.find('._skip').hide();
            } else {
                $tutorial_guide.find('._skip').show();
            }

            // 특수 항목 예외처리
            if (target === 'ck_social_login' && 'Y' === 'N') {
                $tutorial_guide.find('._img').attr('src', '/admin/img/tutorial/tutorial_growth_3_tw.png');
            }

            if (target === 'ck_product' && 'Y' === 'Y' && 'Y' === 'N') {
                $tutorial_guide.find('._description')[0].innerHTML = getLocalizeString("설명_상품추가하기n1버전n2개상품제한", ["Free", "5"], "%1는 %2개로 상품수가 제한됩니다.<br>한도 이하로 삭제하시면 상품 수정/등록이 가능합니다.<br>버전 <a href='/admin/payment?mode=detail&type=upgrade' target='_blank'>업그레이드</a>시 무제한 상품 등록 가능.");
            } else if (target === 'ck_booking' && 'Y' === 'Y' && 'Y' === 'N') {
                $tutorial_guide.find('._description')[0].innerHTML = getLocalizeString("설명_예약상품추가하기n1버전n2개객실제한", ["Free", "1"], "%1는 %2개로 객실수가 제한됩니다.<br>한도 이하로 삭제하시면 객실 수정/등록이 가능합니다.<br>버전 <a href='/admin/payment?mode=detail&type=upgrade' target='_blank'>업그레이드</a>시 무제한 객실 등록 가능.");
            } else {
                $tutorial_guide.find('._description')[0].innerHTML = tutorial_info[target].description;
            }

            $tutorial_guide.find('._link').attr('href', tutorial_info[target].link);
            $tutorial_guide.find('._link').text(tutorial_info[target].button);

            if (target === 'ck_search_engine' && 'Y' === 'Y') {
                $tutorial_guide.find('._link').addClass('google')
            } else {
                $tutorial_guide.find('._link').removeClass('google')
            }

            if (target === 'ck_search_engine' && 'Y' === 'Y') {
                $('<a class="link _link_temp clay-button naver" href="_blank">' + getLocalizeString("버튼_네이버등록방법", "", "네이버 등록 방법") + '</a>').insertBefore($tutorial_guide.find('._link'));
            } else if (target === 'ck_search_engine' && 'Y' === 'N') {
                $tutorial_guide.find('._link').attr('href', '_blank');		// 검색엔진 등록하기 대만 가이드
                $('<a class="btn btn-primary link _link_temp" href="_blank">' + getLocalizeString("버튼_Yahoo등록방법", "", "Yahoo 등록 방법") + '</a>').insertAfter($tutorial_guide.find('._link'));
            } else {
                $tutorial_guide.find('._link_temp').remove();
            }
            $tutorial_guide.find('._skip').unbind().click(function () {
                skipTutorial(target);
            });
            var position_top = ($tutorial_guide.find('._check_list[data-target="' + target + '"]').position().top - $tutorial_guide.find('.tse-content').position().top) - 204;
            if (position_top < 0) position_top = 0;
            $('#tutorial_trackpad .tse-scroll-content').scrollTop(position_top);

            var noneHidedAnchors = Array.from(
                document.querySelectorAll('.button_wrap a')
            )
                .filter(element => $(element).css('display') !== 'none')

            if (noneHidedAnchors.length >= 3) {
                $('.button_wrap').addClass('__col')
            } else {
                $('.button_wrap').removeClass('__col')
            }
        }
    }

    function skipTutorial(target) {
        function success() {
            // 모달 외에 대시보드 자체의 체크리스트도 변경되어야 함, 진행 그래프도 새로 그려줘야 함
            $('._dashboard_tutorial ._check_list[data-target="' + target + '"]').addClass('checked')
            $('._tutorial_guide ._check_list[data-target="' + target + '"]').addClass('checked')
            refreshCheckBarAll();
            if ($(window).width() < 768) {
                // 모바일에서는 건너뛸 때 모달을 닫음
                $('#cocoaModal').modal("hide");
            } else {
                // 그래프 새로 그리고 다음 항목으로 넘겨줘야 함, 기존 항목 클릭 이벤트 제거해줘야 함
                const checkList = document.querySelectorAll('.tutorial_guide .check-list');

                let isCurrentFind = false;

                for (const checkItem of checkList) {
                    const currentTarget = checkItem.getAttribute('data-target');

                    if (currentTarget === target) {
                        isCurrentFind = true;
                        continue;
                    }

                    if (isCurrentFind && !checkItem.classList.contains('checked')) {
                        checkItem.click();

                        return
                    }
                }

                const checkedList = document.querySelectorAll('.tutorial_guide .check-list.checked');

                if (checkedList.length === checkList.length) {
                    $('#cocoaModal').modal("hide");
                } else {
                    const notCheckedItem = document.querySelector('.tutorial_guide .check-list:not(.checked)');

                    notCheckedItem.click();
                }
            }
        }

        $.ajax({
            'type': 'POST',
            'data': { target: target },
            'url': ('/admin/ajax/change_tutorial.cm'),
            'dataType': 'json',
            'async': false,
            'cache': false,
            'success': function (res) {
                if (res.msg === 'SUCCESS') {
                    success();
                } else {
                    alert(res.msg);
                }
            }
        });
    }

    function skipTutorialType(target) {
        $.ajax({
            'type': 'POST',
            'data': { target: target },
            'url': ('/admin/ajax/change_tutorial.cm'),
            'dataType': 'json',
            'async': false,
            'cache': false,
            'success': function (res) {
                if (res.msg === 'SUCCESS') {
                    // 모달 외에 대시보드 자체의 체크리스트도 변경되어야 함, 진행 그래프도 새로 그려줘야 함
                    $('._dashboard_tutorial .dashboard_tutorial_card[data-type="' + target + '"] ._check_list').addClass('checked');
                    refreshCheckBar(target);
                } else {
                    alert(res.msg);
                }
            }
        });
    }

    function refreshCheckBar(target) {
        var $tutorial_type = $('._dashboard_tutorial .dashboard_tutorial_card[data-type="' + target + '"]');
        if ($tutorial_type.length > 0) {
            var $tutorial_guide_type = $('._tutorial_guide ._guide_type_wrap[data-type="' + target + '"]');
            var count = $tutorial_type.find('._check_list.checked').length;
            var max_count = $tutorial_type.find('._check_list').length;
            var percent = max_count > 0 ? count / max_count * 100 : 0;
            $tutorial_type.find('._check_bar').css('width', percent + '%');
            $tutorial_type.find('._check_bar_text').text(getLocalizeString('설명_n1개중n2개완료', [count, max_count], '%1/%2개 완료'));
            if ($tutorial_guide_type.length > 0) {
                $tutorial_guide_type.find('._check_bar').css('width', percent + '%');
                $tutorial_guide_type.find('._check_bar_text').text(getLocalizeString('설명_n1개중n2개완료', [count, max_count], '%1/%2개 완료'));
            }
            if (count === max_count) {
                $tutorial_type.find('._skip').hide();
            }
        }
    }

    function refreshCheckBarAll() {
        refreshCheckBar('tutorial_default');
        refreshCheckBar('tutorial_selling');
        refreshCheckBar('tutorial_growth');
        refreshCheckBar('tutorial_recommend');
    }

    var fold_button_loading = false;
    $('#fold').click(function () {
        if (fold_button_loading) return;

        fold_button_loading = true;

        var $this = $(this);
        var $text = $this.find('span');
        var $dashboard_tutorial = $('.dashboard_tutorial');

        var isFolded = $this.hasClass('fold');

        $('.fold_tooltip').remove()

        setTimeout(() => {
            if (isFolded) {
                carousel()
                $this.removeClass('fold');
                $text.text('접어두기');
                $dashboard_tutorial.removeClass('fold');
                $dashboard_tutorial.slideDown(200)
            } else {
                $this.addClass('fold');
                $text.text('펼치기');
                $dashboard_tutorial.slideUp(200)
                $dashboard_tutorial.addClass('fold');
            }
        }, 0);

        $.ajax({
            type: "POST",
            url: "/admin/ajax/dashboard/tutorial_fold.cm",
            dataType: "json",
            async: true,
            cache: false,
            data: { mode: isFolded ? 'unfold' : 'fold' },
            complete: function () {
                fold_button_loading = false;
            }
        })
    })
})

$(function () {
    Chart.defaults.global.pointHitDetectionRadius = 1;
    Chart.defaults.global.customTooltips = function (tooltip) {
    };
    Chart.defaults.global.scaleFontFamily = 'Lato';
    var chartData = {
        'id': 'stats_chart',
        'data': {
            'labels': ["05-16"],
            'datasets': []
        }
    };

    chartData.data.datasets.push(
        {
            'label': "페이지뷰",
            'fillColor': "#B0E4FF",
            'strokeColor': "#5DCEFF",
            'pointColor': "#B3E3FF",
            'pointStrokeColor': "#eee",
            'pointHighlightFill': "#fff",
            'pointHighlightStroke': "rgba(151,187,205,1)",
            'data': ["0"]
        }
    );
    chartData.data.datasets.push(
        {
            'label': "방문자",
            'fillColor': "#B0E4FF",
            'strokeColor': "#5DCEFF",
            'pointColor': "#196DFF",
            'pointStrokeColor': "#eee",
            'pointHighlightFill': "#fff",
            'pointHighlightStroke': "rgba(151,187,205,1)",
            'data': ["0"]
        }
    );

    var ctx2 = $('#stats_chart').get(0).getContext("2d");
    var myLine = new Chart(ctx2).Line(chartData.data, {
        'responsive': true,
        'onResize': function () {
            $('#stats_chart').css('width', '100%');
        },
        'customTooltips': function (tooltip) {
            var tooltipEl = $("._chartjs_tooltip");

            if (!tooltip) {
                tooltipEl.css({
                    opacity: 0
                });
                return;
            }
            tooltipEl.removeClass('above below');
            tooltipEl.addClass(tooltip.yAlign);

            var innerHtml = '';
            if (typeof tooltip.labels != 'undefined') {
                for (var i = tooltip.labels.length - 1; i >= 0; i--) {
                    innerHtml += [
                        '<div class="chartjs-tooltip-section">',
                        '<span class="chartjs-tooltip-key" style="background-color:' + tooltip.legendColors[i].fill + '"></span>',
                        '<span class="chartjs-tooltip-value">' + tooltip.labels[i] + '</span>',
                        '</div>'
                    ].join('');
                }
            } else {
                innerHtml += [
                    '<div class="chartjs-tooltip-section">',
                    '<span class="chartjs-tooltip-value">' + tooltip.text + '</span>',
                    '</div>'
                ].join('');
            }

            tooltipEl.html(innerHtml);
            tooltipEl.css({
                'opacity': 1,
                'left': tooltip.x + 'px',
                'top': tooltip.y + 'px',
                'fontFamily': 'Lato',
                'fontSize': tooltip.fontSize,
                'fontStyle': tooltip.fontStyle,
                'position': 'absolute',
                'background': '#fff'
            });
        }
    });
})

$('.stats_banner_hide').click(function (e) {
    e.stopPropagation()
    $('.dashboard_stats_banner_container').remove();

    $.ajax({
        url: '/admin/ajax/dashboard/stats_banner_hide.cm',
        type: 'POST',
    })
});

$('.dashboard_stats_banner').click(function () {
    location.href = '/admin/stat/additional_service';
});

function expertBlockModal() {
    $.ajax({
        type: 'GET',
        url: ('/admin/ajax/dialog/expert_modal.cm'),
        dataType: 'html',
        async: false,
        cache: false,
        success: function (res) {
            var $html = $(res);
            if ($html) {
                $.cocoaDialog.open({ type: 'expert_test', custom_popup: $html, close_block: 'static' });
            }
        }
    });
}


function closeExpertPopover() {
    setCookie('expert_dashboard_popover', 'Y', 369);
    $('#expertPopover').popover('hide');
}

function closeBanner(target) {
    setCookie('dashboard_banner_close_' + target, 'Y', 7);
    $('#dashboard_banner_wrap_' + target).remove();
}

$(function () {
    if (getCookie('expert_dashboard_popover') != 'Y') {
        $('#expertPopover').popover('show');
    }
    $('._set_expert_cookie').on('click', function () {
        closeExpertPopover();
    });
});

$(function () {
    DASHBOARD.dashboard_init();
});
function chkFreeVersion(url) {
    var site_version = 'free';
    if (site_version === 'free') {
        if (confirm('현재 사용 중인 요금제 버전에서는 해당 기능이 제한되어 있습니다. 업그레이드 페이지로 이동할까요?')) {
            window.location.href = '_blank';
        }
    } else {
        window.location.href = url;
    }
}

$('._close_btn').off('click').on('click', function () {
    $('._custom_popover').popover('hide');
});
$('._custom_popover').on('shown.bs.popover', function () {
    $('._close_btn').off('click').on('click', function () {
        $('._custom_popover').popover('hide');
    });
});


var cbOwlCarouselWrap = $('.consulting_banner_wrap');
var cbOwlCarousel = $('.consulting_banner');
var cbOwlCarouselItem = document.querySelectorAll('.consulting_banner .item');
cbOwlCarousel.owlCarousel({
    loop: true,
    items: 1,
    margin: 0,
    autoplay: true,
    autoplayTimeout: 3000,
    dots: false,
    onInitialize: function (e) {
        var items = cbOwlCarousel.children('.item');
        var nav = cbOwlCarouselWrap.children('.consulting_banner_nav').children('.consulting_banner_navWrap');
        var nav_total = nav.children('.total');
        nav_total.html(items.length);
    }
});
cbOwlCarousel.on('changed.owl.carousel', function (event) {
    var nav = cbOwlCarouselWrap.children('.consulting_banner_nav').children('.consulting_banner_navWrap');
    var nav_current = nav.children('.current');
    var nav_total = nav.children('.total');
    // loop 되면서 복제된 slide가 2개 생성될때 초기화하는 guard
    if (cbOwlCarouselItem.length + 2 === event.property.value) {
        nav_current.html(1);
        return;
    }
    nav_current.html(event.property.value - 1);
})

$(window).on("keyup", function (e) {
    if ($.cocoaDialog.isOpen()) {
        $.cocoaDialog.modalControl(e);
    }
    return false;
});

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

window.channelPluginSettings = { "pluginKey": "6a8aaaf7-8e2f-400b-9946-491b9354592f", "language": "ko", "zIndex": 1000, "memberId": "M2022120722883bb351d7e", "profile": { "name": "\uc653\uc774", "mobileNumber": "34234", "email": "qjfhdnaos@gmail.com", "joinTime": "2022-12-07 17:37:39", "avatarUrl": "https:\/\/cdn.imweb.me\/thumbnail\/20221207\/b4b43fafd99e7.png", "memberType": "Free", "educationApplication": "N", "visitsCount": 5, "usingConsulting": "", "siteVersion": "Free", "isSiteExpired": "N", "makeDate_dcv1": "2022-12-07 17:42:44", "makeDate": "2024-05-16 09:49:33", "expireDate": null, "latestPaidPlanTransitionTime": null, "expireDate_dcv1": null, "highestRevenueSiteLastMonth": 0, "siteMemberCount_dcv1": 1, "siteMemberCount": 1, "mainDomain": "qjfhdnaos51106.imweb.me", "imwebDomain": "qjfhdnaos51106.imweb.me", "useSSL": "", "usingTrace": "N", "pgName": "\ubbf8\uac00\uc785", "usingNpay": false, "npayVersion": 2, "totalSalePrice": 0, "lastMonthSalePrice": 0 } };
(function () {
    var w = window;
    if (w.ChannelIO) {
        return (window.console.error || window.console.log || function () { })('ChannelIO script included twice.');
    }
    var d = window.document;
    var ch = function () {
        ch.c(arguments);
    };
    ch.q = [];
    ch.c = function (args) {
        ch.q.push(args);
    };
    w.ChannelIO = ch;
    function l() {
        if (w.ChannelIOInitialized) {
            return;
        }
        w.ChannelIOInitialized = true;
        var s = document.createElement('script');
        s.style.zIndex = 1100;
        s.type = 'text/javascript';
        s.defer = true;
        s.src = 'https://cdn.channel.io/plugin/ch-plugin-web.js';
        s.charset = 'UTF-8';
        var x = document.getElementsByTagName('script')[0];
        x.parentNode.insertBefore(s, x);
    }
    if (document.readyState === 'complete') {
        l();
    } else {
        window.addEventListener('load', l, false);
    }
})();

mixpanel.init('a4939111ea54962dbf95fe89a992eab3', { debug: false });
mixpanel.identify('M2022120722883bb351d7e');
MIXPANEL.init();