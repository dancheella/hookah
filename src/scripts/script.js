//Wow.js
new WOW({
    animateClass: 'animate__animated',
}).init();

//Burger
const menu = document.querySelector('.menu__body');
const menuBtn = document.querySelector('.menu__icon');

const body = document.body;

if (menu && menuBtn) {
    menuBtn.addEventListener('click', e => {
        menu.classList.toggle('active')
        menuBtn.classList.toggle('active')
        body.classList.toggle('lock')
    })

    menu.addEventListener('click', e => {
        if (e.target.classList.contains('menu__body')) {
            menu.classList.remove('active')
            menuBtn.classList.remove('active')
            body.classList.remove('lock')
        }
    })

    menu.querySelectorAll('.menu__link').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active')
            menuBtn.classList.remove('active')
            body.classList.remove('lock')
        })
    })
}

//Slider
$('.slider__items').slick({
    dots: true,
    infinite: true,
    speed: 500,
    fade: true,
    cssEase: 'linear',
    responsive: [
        {
            breakpoint: 599,
            settings: {
                arrows: false,
                dots: true,
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
});

$('.review__items').slick({
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 2,
    variableWidth: true,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
                dots: true
            }
        },
        {
            breakpoint: 599,
            settings: {
                arrows: false,
                dots: true,
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
});

//Выпадащий список
const orderList = document.querySelectorAll('.order__list');

// Объявление констант перед циклом forEach
const orderSelect = document.querySelectorAll('.order__select');
const orderArrow = document.querySelectorAll('.order__arrow');
const orderMenu = document.querySelectorAll('.order__menu');
const time = document.querySelectorAll('.time');
const orderSelected = document.querySelectorAll('.order__selected');
let timeValue;

// Проход по всем элементам выпадающего списка
orderList.forEach((dropdown, index) => {
    // Доступ к константам через индекс
    const select = orderSelect[index];
    const arrow = orderArrow[index];
    const menu = orderMenu[index];
    const selected = orderSelected[index];

    // Добавление события click для элемента select
    select.addEventListener('click', () => {
        select.classList.toggle('order__select-clicked');
        arrow.classList.toggle('order__arrow-color');
        menu.classList.toggle('menu-open');
    });

    time.forEach(option => {
        option.addEventListener('click', () => {
            selected.innerText = option.innerText;
            timeValue = option.innerText; // Сохранение выбранного значения в переменной
            select.classList.remove('order__select-clicked');
            arrow.classList.remove('order__arrow-color');
            menu.classList.remove('menu-open');
        });
    });
});

//Data
let successData = document.querySelector('.success-data');
let currentDate = new Date();
let year = currentDate.getFullYear();
let month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
let day = currentDate.getDate();
successData.textContent = `${day}.${month}.${year}`;

//Time
$('.order__menu').on('click', function(event) {
    $('.success-time').text(event.target.textContent);
});

//Запрет вводить цифры в name
let alphabet = /[^A-Za-zА-Яа-яЁё]/g;
let name = $('#name');

name.on('input', function () {
    $(this).val($(this).val().replace(alphabet, ''));
});

//Маска номера
let phone = $('#phone');
phone.mask("+7 (999) 999-99-99");

//Loader
let loader = $('.loader');

//Очистка формы
function resetForm() {
    $('.order__form').remove();
    $('.order-success').css('display', 'block');
}

//Валидация
$('#order__button').click(function () {

    let hasError = false;
    loader.css('display', 'flex');

    //сброс состояния рамок на default
    name.css('border', '1px solid rgb(255, 255, 255)');
    phone.css('border', '1px solid rgb(255, 255, 255)');
    orderSelect.forEach(dropdown => {
        dropdown.style.border = '1px solid rgb(255, 255, 255)';
    }); //сброс рамок на default для всех выпадающих списков


    $('.error-input').hide();

    if (!name.val()) {
        name.next().show();
        name.css('border-color', 'red');
        hasError = true;
        loader.hide();
    }
    if (!phone.val()) {
        phone.next().show();
        phone.css('border-color', 'red');
        hasError = true;
        loader.hide();
    }
    if (!timeValue) {
        orderSelect.forEach(dropdown => {
            dropdown.style.border = '1px solid red';
            $(dropdown).next().next().show();
        });
        hasError = true;
        loader.hide();
    }

    if (!hasError) {
        $.ajax({
            method: "POST",
            url: " https://testologia.site/checkout",
            data: {name: name.val(), phone: phone.val(), time: timeValue} // использование значения переменной
        })
            .done(function (msg) {
                loader.hide();
                if (msg.success) {
                    $('#order__button').prop('click', resetForm);
                } else {
                    alert('Возникла ошибка при бронировании стола! Позвоните нам и мы решим данную проблему!');
                }
            });
    }
});

//Закрытие формы
const orderIcon = document.querySelector('.order__icon');
const orderSuccess = document.querySelector('#order-success');

orderIcon.addEventListener('click', function() {
    orderSuccess.style.display = 'none';
});

//Телефон
let phoneNumberElement = document.querySelector(".number");
phoneNumberElement.onclick = function() {
    location.href = "tel:+7 (964) 837-73-74";
};

//Адрес
let locationFooter = document.querySelector('.footer__place');

locationFooter.addEventListener('click', function() {
    let address = 'Нижний Новгород, Ильинская улица, 3';
    // Перенаправляем пользователя на карту
    window.location.href = 'https://www.google.com/maps/place/' + encodeURIComponent(address);
});