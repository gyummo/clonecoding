
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
    SHOP_PROD_MANAGE.changeGivePointValue('u20240516664558215af61');
});
/*----------------------*/

SHOP_PROD_MANAGE.initProdRelative('');
SHOP_PROD_MANAGE.setUseRelativeOptionPrice('u20240516664558215af61', false);
$(function () {
    var $deliv_list = { "u20240516664558215af61": [{ "deliv_code": "d20240516a72e346cbce62", "deliv_price_mix": true, "installation_costs": false, "default_island_use": true, "deliv_use": true, "use_today_default_config": true, "deliv_type": "default", "parcel": true, "visit": false, "quick": false, "cvs": false, "deliv_pay_type": "default", "deliv_price_type": "standard", "deliv_price_fix": 2500, "deliv_price_flexable_key": 50000, "deliv_price_flexable_value": 2500, "weight_default_start_size": 0, "weight_default_price": 0, "weight_start_size": [0], "weight_price": [0], "quantity_default_price": 0, "quantity_default_start_count": 1, "quantity_start_count": [0], "quantity_price": [0], "quantity_repeat_price": 0, "quantity_repeat_count": 0, "quantity_section_type": "section", "amount_default_start_price": 0, "amount_default_price": 0, "amount_start_price": [0], "amount_price": [0], "use_default_deliv_additional_price": true, "cvs_use_same_refund_price": true, "use_deliv_additional_price": false, "additional_price_type": "default", "deliv_additional_price_list": [], "jeju_price": 0, "land_price": 0, "shopping_additional_price_msg": "", "use_shop_return": true, "shop_return_accept_day": 14, "non_refundable_content": "", "deliv_post_name": "", "deliv_group_code": "", "today_deliv_use_type": "D", "today_deliv_type": "three", "today_arrival_time": "0:00", "today_deliv_day_expect": null, "today_deliv_day_avg": null, "cvs_data": [], "cvs_config": false }] };
    var shipping_template_code_list = { "u20240516664558215af61": "T20240516ddd4163c80129" };
    var shipping_template_data_list = { "T20240516ddd4163c80129": { "idx": "631949", "site_code": "S20240516cc656761618e8", "unit_code": "u20240516664558215af61", "code": "T20240516ddd4163c80129", "is_default": true, "shipping_place_code": "P20240516c418616c49d2d", "deliv_group_code": "d20240516241e5dc96e9e1", "name": "\ubc30\uc1a1 \ud15c\ud50c\ub9bf A", "deliv_guid": "", "add_time": "2024-05-16 09:49:46", "update_time": "0000-00-00 00:00:00", "config_delivery_list": [{ "idx": 1230423, "code": "d20240516a72e346cbce62", "site_code": "S20240516cc656761618e8", "unit_code": "u20240516664558215af61", "shipping_template_code": "T20240516ddd4163c80129", "cvs_list": [], "deliv_tax_free": false, "parcel_company": "", "exchange_price": 5000, "return_price": 2500, "deliv_price_after_text_use": false, "deliv_country_list": ["KR"], "deliv_type": "send", "parcel": true, "visit": false, "quick": false, "cvs": false, "deliv_pay_type": "price", "deliv_price_type": "flexable", "deliv_price_fix": 2500, "deliv_price_flexable_key": 50000, "deliv_price_flexable_value": 2500, "weight_default_start_size": 0, "weight_default_price": 0, "weight_start_size": [0], "weight_price": [0], "quantity_default_price": 0, "quantity_default_start_count": 1, "quantity_start_count": [0], "quantity_price": [0], "quantity_repeat_price": 0, "quantity_repeat_count": 0, "quantity_section_type": "section", "amount_default_start_price": 0, "amount_default_price": 0, "amount_start_price": [0], "amount_price": [0], "use_default_deliv_additional_price": true, "cvs_use_same_refund_price": true, "use_deliv_additional_price": false, "additional_price_type": "easy_setup", "deliv_additional_price_list": [], "jeju_price": 0, "land_price": 0, "shopping_additional_price_msg": "", "use_shop_return": true, "shop_return_accept_day": 14, "non_refundable_content": "", "deliv_post_name": "", "deliv_group_code": "", "today_deliv_use_type": "N", "today_deliv_type": "departure", "today_arrival_time": "", "today_deliv_day_expect": null, "today_deliv_day_avg": null, "cvs_data": [], "cvs_config": false }], "deliv_country_list": ["KR"], "shipping_place_data": { "idx": "625270", "site_code": "S20240516cc656761618e8", "unit_code": "u20240516664558215af61", "code": "P20240516c418616c49d2d", "shipping_place_name": "\ucd9c\uace0 \ubc0f \ubc18\ud488\/\uad50\ud658\uc9c0\uba85 A", "country": "KR", "address_data": [], "return_address_data": [], "call_num": "", "add_time": "2024-05-16 09:49:46", "update_time": "0000-00-00 00:00:00", "place_address_postcode": null, "place_address": null, "place_address_detail": null, "return_place_address_postcode": null, "return_place_address": null, "return_place_address_detail": null } } };
    SHOP_PROD_MANAGE.addUnitData('u20240516664558215af61', 'KR', '₩', ',', '.', 0, 'KRW');
    SHOP_PROD_MANAGE.setDefaultUnitCode('u20240516664558215af61');
    SHOP_PROD_MANAGE.setCurrentUnitCode('u20240516664558215af61');
    SHOP_PROD_MANAGE.initAdd('add', '0', 'u20240516664558215af61', $deliv_list, 'N', shipping_template_code_list, shipping_template_data_list);
    SHOP_PROD_MANAGE.changeMobileContentStatus('N');

    SHOP_OPTION_MANAGE.init({
        'prod_code': '',
        'unit_code': ["u20240516664558215af61"],
        'option_prefix': '20240521',
        'max_input_length': 20,
        'max_option_length': 500,
        'regularly_option_edit': 'N',
    });

    SHOP_PROD_MANAGE.loadCategoryList(undefined, true); SHOP_PROD_MANAGE.changeGivePointValue('u20240516664558215af61');
});
/*----------------------*/

$(document).ready(function () {
    $('.fixed-top').scrollToFixed({
        marginTop: function () {
            var marginTop = $(window).height() - $('.fixed-top').outerHeight(true) - 20;
            if (marginTop >= 0) return 20;
            return marginTop;
        }
    });
    /*
    $('.prod-title-fixed-top').scrollToFixed({
        marginTop: 15,
        zIndex: 9999
    });
    */
    SHOP_PROD_MANAGE.initPreSale($("._pre_sale_form"));

    $('#prod_showcase').chosen({ width: "100%", no_results_text: "선택된 기획전이 없습니다." });
});
$('body').on('click', function (e) {
    $('[data-toggle="popover"]').each(function () {
        //the 'is' for buttons that trigger popups
        //the 'has' for icons within a button that triggers a popup
        if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
            $(this).popover('hide');
        }
    });
});

$('#prod_image_upload2').click(function () {
    $('#prod_image_upload').click();
});
/*----------------------*/

/*----------------------*/
$(function () {
    var is_ori_use_regularly_prod_alert_complete = false;

    var ori_use_regularly_prod = 'N' === 'Y';
    //정기구독 사용여부
    var $product_use_regularly = $("#product_use_regularly");
    $product_use_regularly.click(function (o) {
        var is_checked = $(this).is(":checked");

        //기존에 정기구독 사용을 하던 상품인경우
        if (ori_use_regularly_prod && !is_checked && !is_ori_use_regularly_prod_alert_complete) {
            if (confirm('신청된 정기구독 내역이 있을 경우, 구매자에게 정기구독 해지 요청/안내가 필요합니다. 설정을 해제하시겠습니까?')) {
                is_ori_use_regularly_prod_alert_complete = true;
                setRegularlyLayout(is_checked);
            } else {
                $(this).prop('checked', true);
            }
        } else {
            setRegularlyLayout(is_checked);
        }

    });

    //구독주기 선택옵션 설정
    var $regularly_period_type = $("#regularly_period_type");
    $regularly_period_type.change(function () {
        setRegularlSettingyLayout($(this).val());
    });

    //구독주기 개별설정
    var $select_period = $("input[name='select_period']");
    $select_period.click(function () {
        setRegularlyPeriodLayout($(this).val());
    });

    function setRegularlyLayout(use_regularly_prod) {
        var $regularly_wrap = $("#regularly_wrap");
        if (use_regularly_prod) {
            $regularly_wrap.removeClass('display-none');
        } else {
            $regularly_wrap.addClass('display-none');
        }
    }


    function setRegularlSettingyLayout(type) {
        var $regularly_custom_wrap = $("#regularly_custom_wrap");
        if (type === 'custom') {
            $regularly_custom_wrap.removeClass('display-none');
        } else {
            $regularly_custom_wrap.addClass('display-none');
        }
    }




    function setRegularlyPeriodLayout(use_period) {
        var $select_period_use_wrap = $("#select_period_use_wrap");
        var select_period_not_use_wrap = $("#select_period_not_use_wrap");
        if (use_period === 'Y') {
            $select_period_use_wrap.removeClass('display-none');
            select_period_not_use_wrap.addClass('display-none');
        } else {
            $select_period_use_wrap.addClass('display-none');
            select_period_not_use_wrap.removeClass('display-none');
        }

    }


});



/*----------------------*/

/*----------------------*/
$(function () {
    $('input[type="checkbox"][value="ZIGZAG"]').click(function () {
        if (!$(this).prop('checked')) {
            var uncheck_check = confirm('연동 상품을 해제하면 판매 채널에서 상품이 삭제됩니다. 해제 후 새로 연동할 수 있습니다.');
            if (!uncheck_check) {
                $(this).prop('checked', true);
            }
        }
    });
    SHOP_PROD_MANAGE.isZigzagSync('sync');
});
/*----------------------*/
/*----------------------*/
$(document).ready(function () {
    const isActivatedInCountry = Boolean();
    const isMarketAmericaEnabled = Boolean(0);
    const isTWLangCode = Boolean();
    const isTWDCurrency = Boolean();

    if (
        !isActivatedInCountry
        || !isMarketAmericaEnabled
        || !isTWLangCode
        || !isTWDCurrency
    ) return;

    function setDefaultSelectedElement(options) {
        Object.keys(options || {}).map(layer => {
            $(`select[data-layer="${layer}"]`)
                .val(options && options[layer] && options[layer].key)
                .trigger('change', true);
        });
    }

    function nestedSelectorElementFactory(parent, channel, options, layer = 1) {
        const baseAttributes = { 'data-layer': layer };
        const selectElement = $('<select>', { ...baseAttributes, class: 'form-control' })
            .on('change', (event, isInit = false) => {
                let isCompleted = false;

                if (event.target.value === '') {
                    $(`[data-layer]`).filter((_, elem) => parseInt($(elem).data('layer'), 10) > layer).remove();
                    isCompleted = false;
                }

                const { children, ...rest } = options.find((option) => option.key === event.target.value) || {};

                if (!!children) {
                    const nextLayer = layer + 1;
                    $(`[data-layer]`).filter((_, elem) => parseInt($(elem).data('layer'), 10) > layer).remove();

                    nestedSelectorElementFactory(parent, channel, children, nextLayer);
                }

                if (event.target.value !== '' && !children) {
                    isCompleted = true;
                }

                SHOP_PROD_MANAGE.updateIntegrationCategory(channel, layer, rest, {
                    isInit,
                    isCompleted
                });
            });
        const defaultOption = { key: '', displayName: getLocalizeString('설명_카테고리', '', '카테고리') };
        const optionElements = [defaultOption, ...options].reduce((result, option) => {
            return [...result, $('<option>', { value: option.key, text: option.displayName })];
        }, []);

        return parent.append(
            selectElement.append(optionElements)
        );
    }

    const category = JSON.parse('[]');
    const selectedOptions = category['MARKET_AMERICA'];
    const selectorContainer = $('#market_america_container');
    nestedSelectorElementFactory(selectorContainer, 'MARKET_AMERICA', MARKET_AMERICA_CATEGORIES);
    setDefaultSelectedElement(selectedOptions);
});
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