'use strict';
let headDrop = [`.header-drop__text`, `.header-inner__text`, `#header__dropdown-list`, `#head_drop_icon`];
let footDrop = [`.footer-drop__text`, `.footer-inner__text`, `#footer__dropdown-list`, `#foot_drop_icon`];
let setWidth = text => {
    $(text).width((String($(`.drop__select`).val()).length + 1) * 8);
}
let showDropdown = (list, elem) => {
    $(list).toggleClass(`active`);
    $(elem).toggleClass(`--arrow-down_st_active`);
}
let setValue = (select, val) => {
    $(select).attr('value', val);
}
let closeDropdown = ([elem, select, list, icon]) => {
    $(elem).on(`click`, (evt) => {
        let text = $(evt.target).text();
        $(select).attr('value', text);
        showDropdown(list, icon);
        setWidth(select);
    })
}

closeDropdown(headDrop);
closeDropdown(footDrop);

$(`#dropdown`).on(`mouseover`, (evt) => {
    $(`#drop_text`).toggleClass(`text_st_hover`);
    $(`#drop_icon`).toggleClass(`icon_st_hover`);
    if (evt.target == $(window)) $(`#drop_icon`).removeClass(`icon_st_hover`);
})
$(`#dropdown`).on(`mouseout`, () => {
    $(`#drop_text`).toggleClass(`text_st_hover`);
    $(`#drop_icon`).toggleClass(`icon_st_hover`);
})

for (let evt of [`click`]) {
    $(`#header_drop`).on(evt, () => {
        showDropdown(`#header__dropdown-list`, `#head_drop_icon`)
    })
    $(`#footer_drop`).on(evt, () => {
        showDropdown(`#footer__dropdown-list`, `#foot_drop_icon`)
    })
    $(`.checkbox__inner`).on(evt, () => {
        $(`.checkbox__inner`).toggleClass(`checkbox_v_active`);
        if ($(`#check__email`).attr(`checked`)) $(`#check__email`).attr(`checked`, false)
        else $(`#check__email`).attr(`checked`, true)
    })
    $(`.submit-form__btn`).on(evt, evt => {
        if (((String($(`#review__text`).val()).length) == 0) || !($(`#check__email`).attr(`checked`))) {
            evt.preventDefault();
            alert(`Please, accept the terms`);
        }
    })
    $(`#map_btn`).on(evt, evt => {
        $(`.popup-map`).toggleClass(`active`);
        $(`body`).toggleClass(`no-scroll`)
    })
    $(`.popup-map`).on(evt, evt => {
        let val = Object.values($(`ymaps`)).filter(e => evt.target == e)
        if (val.length == 0) {
            $(`.popup-map`).toggleClass(`active`);
            $(`body`).toggleClass(`no-scroll`);
        }
    })
    $(`.--icon-hamburg`).on(evt, evt => {
        showDropdown(`.header-bottom__nav`);
        $(`.header-bottom__nav`).toggleClass(`dropdown__list`);
    })
}

for (let elem of [`mouseover`, `mouseout`]) {
    $(`.feedback__icons`).on(elem, evt => {
        $(evt.target).toggleClass(`icons_v_hover`);
    })
    $(`.footer__item_m_padding`).on(elem, evt => {
        $(evt.target).toggleClass(`text_c_gray`);
    })
}

$(window).on(`click`, evt => {
    console.log(evt.target)
    let dropdownHandler = () => {
        let values = Object.values(($(`.drop__select`))).splice(0, 2)
        let arrows = $(`.--arrow-down`)
        if (evt.target != values[0] && evt.target != values[1] && evt.target != arrows[0] && evt.target != arrows[1] && evt.target != $(`.--icon-hamburg`)[0]) {
            $(`.dropdown__list`).removeClass(`active`);
            $(`.--arrow-down`).removeClass(`--arrow-down_st_active`);
        }
    }
    dropdownHandler();
    if (evt.target != $(`.header-bottom__nav`) && evt.target != $(`.--icon-hamburg`)[0])
        $(`.header-bottom__nav`).removeClass(`dropdown__list`);
})

setValue(`.header-inner__text`, 'US')
setValue(`.footer-inner__text`, 'US')
setWidth(`.header-inner__text`);
setWidth(`.footer-inner__text`);
