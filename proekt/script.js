const burger = document.getElementById('burger');
const menu = document.querySelector('.header__menu');

burger.addEventListener('click', () => {
    menu.classList.toggle('active');
});

// 2. Плавная навигация по якорям
document.querySelectorAll('.header__link, .hero__btn').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                // Закрываем меню на мобилке
                menu.classList.remove('active');
            }
        }
    });
});

// 3. Работа с формой обратной связи (DOM + событие)
const form = document.getElementById('contact-form');
const statusDiv = document.getElementById('form-status');

form.addEventListener('submit', function (e) {
    e.preventDefault(); // отменяем перезагрузку

    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();

    // Простая валидация
    if (!name || !phone) {
        statusDiv.textContent = '⚠️ Заполните имя и телефон!';
        statusDiv.style.color = '#e74c3c';
        return;
    }

    // Имитация отправки (задержка для реализма)
    statusDiv.textContent = '⏳ Отправка...';
    statusDiv.style.color = '#f39c12';

    setTimeout(() => {
        // Успешная отправка
        statusDiv.textContent = '✅ Заявка отправлена! Мы свяжемся с вами.';
        statusDiv.style.color = '#27ae60';
        form.reset(); // очищаем поля
    }, 1500);
});

// 4. Инициализация Яндекс.Карты (используем DOM для вставки)
function initMap() {
    const mapElement = document.getElementById('map');
    if (mapElement) {
        try {
            // Создаем карту с помощью Yandex Maps API
            const map = new ymaps.Map('map', {
                center: [55.751574, 37.573856], // координаты Москвы
                zoom: 15,
                controls: ['zoomControl']
            });
            // Добавляем метку
            const placemark = new ymaps.Placemark([55.751574, 37.573856], {
                balloonContent: 'AutoMaster — Автосервис'
            });
            map.geoObjects.add(placemark);
        } catch (error) {
            console.log('Ошибка загрузки карты:', error);
        }
    }
}

// Загружаем карту после загрузки страницы (DOMContentLoaded)
document.addEventListener('DOMContentLoaded', function () {
    // Проверяем, загрузился ли API Яндекс.Карт
    if (typeof ymaps !== 'undefined' && ymaps.Map) {
        ymaps.ready(initMap);
    } else {
        // Если API не загружен, выводим сообщение (например, если нет ключа)
        const mapDiv = document.getElementById('map');
        if (mapDiv) {
            mapDiv.innerHTML = '<p style="padding:20px;text-align:center;">Для отображения карты вставьте ваш API-ключ Яндекса в index.html</p>';
        }
    }
});
