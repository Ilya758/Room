'use strict';
let headDrop = [`.dropdown_item_head`, `#dropdown_text_head`, `#header__dropdown-list`, `#head_drop_icon`];

let footDrop = [`.dropdown_item_foot`, `#dropdown_text_foot`, `#footer__dropdown-list`, `#foot_drop_icon`];

let setHTML = text => {//set inner Text for dropdown
    $(`#header_drop .text_e_dropdown`).html(text);
}
let setWidth = text => {//set value for dropdown
    $(text).width((String($(`#dropdown_text_foot`).val()).length + 1) * 8);
}

let showDropdown = (list, elem) => {//shows dropdown
    $(list).toggleClass(`active`);
    $(elem).toggleClass(`--arrow-down_st_active`);
}

let setValue = (select, val) => {//set value for dropdown
    $(select).attr('value', val);
}

let closeDropdown = ([elem, select, list, icon]) => {//close dropdown
    $(elem).on(`click`, (evt) => {
        let text = $(evt.target).text();
        if ($(list)[0] == $(`#footer__dropdown-list`)[0]) {
            $(select).attr('value', text);
            setWidth(select);
        }
        else setHTML(text);
        showDropdown(list, icon);
    })
}

closeDropdown(headDrop);
closeDropdown(footDrop);

$(`#dropdown`).on(`mouseover`, (evt) => {//hover effects 
    $(`#drop_text`).toggleClass(`text_st_hover`);
    $(`#drop_icon`).toggleClass(`icon_st_hover`);
    if (evt.target == $(window)) $(`#drop_icon`).removeClass(`icon_st_hover`);
})

$(`#dropdown`).on(`mouseout`, () => {//hover effects
    $(`#drop_text`).toggleClass(`text_st_hover`);
    $(`#drop_icon`).toggleClass(`icon_st_hover`);
})

for (let evt of [`click`]) {//click handler
    $(`#header_drop`).on(evt, () => {
        showDropdown(`#header__dropdown-list`, `#head_drop_icon`)
    })
    $(`#footer_drop`).on(evt, () => {
        showDropdown(`#footer__dropdown-list`, `#foot_drop_icon`)
    })
    $(`.submit-form__info`).on(evt, () => {
        $(`.submit-form__checkbox`).toggleClass(`checkbox_v_active`);
        if ($(`#check__email`).attr(`checked`)) $(`#check__email`).attr(`checked`, false)
        else $(`#check__email`).attr(`checked`, true)
    })
    $(`.submit-form__btn-container`).on(evt, evt => {
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

for (let elem of [`mouseover`, `mouseout`]) {//hover effects
    $(`.feedback__icons`).on(elem, evt => {
        $(evt.target).toggleClass(`icons_v_hover`);
    })
    $(`.footer__item`).on(elem, evt => {
        $(evt.target).toggleClass(`text_c_red`);
    })
}

$(window).on(`click`, evt => {//window-click handler
    let dropdownHandler = () => {
        let values = Object.values(($(`.text_e_dropdown`))).splice(0, 2)
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

setHTML(`US`);
$(`.slider__content`).slick({//initialized first slider
    dots: true,
    centerMode: true,
    speed: 500,
    initialSlide: 1,
    adaptiveHeight: true,
});
$(`.second-slider__content`).slick({//initializied second slider
    dots: true,
    centerMode: true,
    speed: 500,
    initialSlide: 1,
    adaptiveHeight: true,
    speed: 1000,
    pauseOnHover: true,
    pauseOnDotsHover: true,
});