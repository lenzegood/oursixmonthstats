document.addEventListener('DOMContentLoaded', () => {
    updateTimers();
    setInterval(updateTimers, 1000);
    initMusicPlayer();
    initDistanceSlider();
    initOscar();
    initMeetingMessage();
});

// Таймеры
function updateTimers() {
    updateRelationshipTimer();
    updateLastCallTimer();
    updateMeetingTimer();
}

function updateRelationshipTimer() {
    const startDate = new Date('2024-08-11T00:00:00');
    const now = new Date();
    const diff = now - startDate;

    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);

    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
}

function updateLastCallTimer() {
    const lastCallDate = new Date('2025-01-01T00:00:00');
    const now = new Date();
    const diff = now - lastCallDate;

    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);

    document.getElementById('last-call-timer').textContent = 
        `${days}d ${hours}h ${minutes}m ago`;
}

function updateMeetingTimer() {
    const targetDate = new Date('2025-07-20T00:00:00');
    const now = new Date();
    const diff = targetDate - now;

    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);

    document.getElementById('meet-days').textContent = days;
    document.getElementById('meet-hours').textContent = hours;
    document.getElementById('meet-minutes').textContent = minutes;
}


// Массив с расстояниями по месяцам
const distances = [7359, 7359, 7359, 7021, 7259, 7043, 7359];  // Расстояние для каждого месяца (август, сентябрь, октябрь, ноябрь, декабрь, январь)

// Элементы интерфейса
const distanceSlider = document.getElementById('distance-slider');
const distanceDisplay = document.getElementById('current-distance');

// Функция для обновления расстояния
function updateDistance() {
    const index = distanceSlider.value;  // Получаем значение ползунка
    distanceDisplay.textContent = distances[index];  // Обновляем текст расстояния
}

// При загрузке страницы и изменении значения ползунка
window.addEventListener('load', updateDistance);
distanceSlider.addEventListener('input', updateDistance);


function initOscar() {
    let hugCount = 500;
    const oscarImg = document.getElementById('oscar-img');
    const hugCounter = document.getElementById('hug-count');
    const secretMessageContainer = document.getElementById('secret-message-container'); // контейнер с секретным сообщением

    secretMessageContainer.style.display = 'none';

    oscarImg.addEventListener('mousedown', () => {
        hugging = true;
    });

    oscarImg.addEventListener('mouseup', () => {
        if (hugging) {
            hugCount++;
            hugCounter.textContent = hugCount;

            // Когда счётчик достигает 521, показываем секретное сообщение
            if (hugCount === 521) {
                secretMessageContainer.style.display = 'block'; // Показываем скрытое сообщение
            }

            // Анимация сердца
            createHeartAnimation(event.clientX, event.clientY);  // создаём сердечко по клику
        }
    });

    oscarImg.addEventListener('mouseleave', () => {
        hugging = false;  // прекращаем отслеживание
    });
}

function createHeartAnimation(x, y) {
    const heart = document.createElement('div');
    heart.className = 'heart-emoji';
    heart.style.backgroundImage = "url('images/heart.png')";
    heart.style.width = "30px";
    heart.style.height = "30px";
    heart.style.position = "absolute";
    heart.style.left = `${x - 15}px`;
    heart.style.top = `${y - 15}px`;
    heart.style.opacity = "1";
    heart.style.transition = "transform 1s ease-out, opacity 1s ease-out";
    document.body.appendChild(heart);

    // Случайное движение сердечка
    const angle = Math.random() * 2 * Math.PI;
    const distance = Math.random() * 100 + 50;
    const moveX = Math.cos(angle) * distance;
    const moveY = Math.sin(angle) * distance;

    setTimeout(() => {
        heart.style.transform = `translate(${moveX}px, ${moveY}px) scale(0.5)`;
        heart.style.opacity = "0";
    }, 10);

    setTimeout(() => heart.remove(), 1000);
}


// Интерактивность до встречи
function initMeetingMessage() {
    const meetingDate = new Date('2025-07-20T00:00:00');
    const now = new Date();
    const diff = meetingDate - now;

    if (diff <= 0) {
        document.getElementById('meeting-message').textContent = "We will meet soon!";
    } else {
        const days = Math.floor(diff / 86400000);
        document.getElementById('meeting-message').textContent = `Countdown to meeting: ${days} days left.`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const oscarImg = document.getElementById('oscar-img');
        if (!oscarImg) {
            console.error("Oscar image not found!");
        } else {
            initOscar();
        }
    }, 500);
});

oscarImg.addEventListener('click', (e) => {
    hugCount++;
    hugCounter.textContent = hugCount;

    const heart = document.createElement('div');
    heart.className = 'heart-emoji';

    // Получаем позицию контейнера
    const oscarContainer = document.querySelector('.oscar-container');
    const containerRect = oscarContainer.getBoundingClientRect();
    const offsetX = e.clientX - containerRect.left; // Смещение по оси X
    const offsetY = e.clientY - containerRect.top;  // Смещение по оси Y

    // Позиционируем сердечко
    heart.style.left = `${offsetX - 15}px`; // Центрируем по клику
    heart.style.top = `${offsetY - 15}px`;  // Центрируем по клику
    heart.style.opacity = "1";
    heart.style.transition = "transform 1s ease-out, opacity 1s ease-out";
    oscarContainer.appendChild(heart);

    // Случайный разлет сердечек
    const angle = Math.random() * 2 * Math.PI;
    const distance = Math.random() * 100 + 50; // Дальность отлета (50-150px)
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;

    setTimeout(() => {
        heart.style.transform = `translate(${x}px, ${y}px) scale(0.5)`;
        heart.style.opacity = "0";
    }, 10);

    setTimeout(() => heart.remove(), 1000);
});


window.addEventListener("scroll", function() {
    var scrolled = window.pageYOffset;
    document.querySelectorAll('.parallax img').forEach(function(image) {
        image.style.transform = 'translateY(' + scrolled * 0.5 + 'px)';
    });
});
