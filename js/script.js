'use strict';

document.addEventListener('DOMContentLoaded', () => {

    const headerDropList = document.querySelector('.header-dropdown__list');
    const headerDropItem = document.querySelectorAll('.header-dropdown__item');
    const footerDropList = document.querySelector('.footer-dropdown__list');
    const footerDropItem = document.querySelectorAll('.footer-dropdown__item');

    const dropdownHandler = (list, item) => {
        list.addEventListener('click', event => {
            if (event.target.className.startsWith('dropdown__list-item')) {
                list.classList.toggle('visible');
                list.classList.toggle('--arrow-down_st_active');
                for (let el of item) {
                    if (el !== event.target) {
                        el.classList.remove('active');
                    } else {
                        el.classList.add('active');
                    }
                }
            }
        })
    }

    dropdownHandler(headerDropList, headerDropItem);
    dropdownHandler(footerDropList, footerDropItem);

    const lowerNavList = document.querySelector('.header-bottom__nav');
    const lowerNavBtn = document.querySelector('.--icon-hamburg');

    const classToggler = () => {
        lowerNavBtn.addEventListener('click', () => {
            lowerNavList.classList.toggle('active');
        });
    }

    classToggler();

    const getCheckboxElem = () => {
        return document.querySelector('.submit-form__checkbox-inner');
    }

    const checkbox = getCheckboxElem();

    (() => { // toggle attrubute 'checked' in input[type="checkbox"] 
        const label = document.querySelector('.submit-form__checkbox');
        label.addEventListener('click', () => {
            checkbox.checked != checkbox.checked;
        })
    })();

    (() => { // form-handler
        const formButton = document.querySelector('.submit-form__btn-text');
        formButton.addEventListener('click', (event) => {
            const textReview = document.querySelector('#review__text').value.length;
            if ((textReview === 0) || !checkbox.checked) {
                event.preventDefault();
                alert(`Please, accept the terms`);
            }
        })
    })();

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

    async function mapPromise(url) {//send request to API Yandex.Map and substitues API or img.png depending on response
        let response = fetch(url, {
            headers: `Access-Control-No-Origin`,
        });
        await response
            .then(e => {
                $(`#popup_content`).html(url)
            })
            .catch(err => {
                $(`#popup_content`).html(`<img class="failed_map" src="img/failed_map.png" alt="failed_map">`);
            }
            );
    }
    mapPromise(`https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A76d42377514b60e1a1950199dd3fa7fa5c6f25bf0b533112124ecd01292bab3d&amp;width=100%25&amp;height=400&amp;lang=ru_RU&amp;scroll=true`);

    const getMapElem = () => { // will be return "map"-selector when the promise become fullfilled/rejected
        return document.querySelector('.failed_map');
    }

    let popupWrap = document.querySelector('.popup-map');
    let mapBtn = document.querySelector('#map_btn');

    mapBtn.addEventListener('click', () => {
        popupWrap.classList.add('active');
    })

    document.addEventListener('click', (event) => { // document-clicks handler
        const mapTarget = event.target.parentElement.parentElement.parentElement;
        if (event.target !== getMapElem() && mapTarget !== mapBtn) {
            popupWrap.classList.remove('active');
        }
        if (event.target !== lowerNavList && event.target !== lowerNavBtn) {
            lowerNavList.classList.remove('active');
        }
        if (event.target !== Array.from(headerDropItem).find((e) => e === event.target)) {
            headerDropList.classList.remove('visible');
        }
        if (event.target !== Array.from(footerDropItem).find((e) => e === event.target)) {
            footerDropList.classList.remove('visible');
        }
    })

    const positionFix = () => { //fixes block display on safari(mobile) 
        const ua = navigator.userAgent.toLowerCase();
        if (ua.indexOf('chrome') !== 94) {
            headerDropList.style.top = '-1px';
        } else {
            headerDropList.style.top = '0';
        }
    }
    positionFix();
})