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

// отзывы, ДОДЕЛАТЬ И СТИЛИЗОВАТЬ!!! НЕ СОХРАНЯЮТСЯ(ДЕЛАЛ В PERLEXITY)
