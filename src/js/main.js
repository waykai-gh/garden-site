// Ждём загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    // Находим все секции с классом .section
    const sections = document.querySelectorAll('.section');

    // Функция для анимации появления
    const revealSection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) { // Если секция в зоне видимости
                entry.target.style.opacity = '1'; // Показываем её
                entry.target.style.transform = 'translateY(0)'; // Сдвигаем в исходное положение
                observer.unobserve(entry.target); // Перестаём следить за этой секцией
            }
        });
    };

    // Создаём наблюдатель за секциями
    const sectionObserver = new IntersectionObserver(revealSection, {
        threshold: 0.1 // Срабатывает при 10% видимости секции
    });

    // Настраиваем начальное состояние (скрыто)
    sections.forEach(section => {
        section.style.opacity = '0'; // Скрываем секцию
        section.style.transform = 'translateY(30px)'; // Сдвигаем вниз
        sectionObserver.observe(section); // Начинаем следить за секцией
    });
});

// Обработчик прокрутки
document.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar-container');
    const headerHeight = document.querySelector('.main-header').offsetHeight;
    const scrollPosition = window.scrollY; // Текущая прокрутка

    if (scrollPosition > headerHeight) { // "прилипаем" только когда достигли шапки
        navbar.style.position = 'fixed'; // Меню "прилипает" сверху
        navbar.style.top = '0'; // Прижимаем к верхней границе
        navbar.style.width = '100%'; // Занимает всю ширину
        navbar.style.zIndex = '1000'; // Чтобы меню было поверх контента
    } else {
        navbar.style.position = 'static'; // Возвращаем исходное положение
        navbar.style.top = ''; // Удаляем стиль
        navbar.style.width = ''; // Удаляем стиль
        navbar.style.zIndex = ''; // Удаляем стиль
    }
});

// карты... сука
document.addEventListener('DOMContentLoaded', () => {
    if (!window.mapKey) {
        console.error('API-ключ не найден');
        return;
    }

    const script = document.createElement('script');
    script.src = `https://api-maps.yandex.ru/2.1/?apikey=${window.mapKey}&lang=ru_RU`;
    script.onload = () => {
        if (typeof ymaps === 'undefined') {
            console.error('ymaps не определён');
            return;
        }
        ymaps.ready(initMap);
    };
    script.onerror = () => {
        console.error('Не удалось загрузить API Яндекс.Карт');
    };
    document.head.appendChild(script);
});

function initMap() {
    const gardenCoords = [43.374105, 131.991881]; // Замените на свои координаты
    const mapElement = document.getElementById('map');

    if (!mapElement) {
        console.error('Элемент карты не найден');
        return;
    }

    try {
        const map = new ymaps.Map("map", {
            center: gardenCoords,
            zoom: 10,
            controls: []
        });

        // Метка детского сада
        const gardenPlacemark = new ymaps.Placemark(
            gardenCoords,
            { balloonContent: 'Детский сад "Шаги"' },
            { preset: 'islands#blueHomeIcon' } 
        );
        map.geoObjects.add(gardenPlacemark);

        // Получение местоположения пользователя
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const userCoords = [
                        position.coords.latitude,
                        position.coords.longitude     
                    ];

                    const userPlacemark = new ymaps.Placemark(
                        userCoords,
                        { balloonContent: 'Вы здесь' },
                        { preset: 'islands#redDotIcon' }
                    );
                    map.geoObjects.add(userPlacemark);

                    // Авто-зум на обе точки
                    const bounds = [userCoords, gardenCoords];
                    map.setBounds(bounds, { checkZoom: true });
                },
                () => {
                    alert('Не удалось определить ваше местоположение');
                }
            );
        } else {
            alert('Геолокация не поддерживается вашим браузером');
        }
    } catch (error) {
        console.error('Ошибка инициализации карты:', error);
    }
}
