// Тёмная тема
const themeToggle = document.createElement('button');
themeToggle.textContent = '🌓 Тёмная тема';
themeToggle.style.position = 'fixed';
themeToggle.style.top = '10px';
themeToggle.style.right = '10px';
themeToggle.style.zIndex = '1000';
document.body.prepend(themeToggle);

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    themeToggle.textContent = document.body.classList.contains('dark-theme')
        ? '🌞 Светлая тема'
        : '🌓 Тёмная тема';
});

// Система отзывов
const reviews = [
    { name: 'Иван', text: 'Отличные товары!', rating: 5, date: new Date('2024-03-01') },
    { name: 'Мария', text: 'Доставили быстро', rating: 4, date: new Date('2024-03-05') }
];

const reviewsContainer = document.createElement('div');
reviewsContainer.id = 'reviews-container';
reviewsContainer.style.padding = '20px';
document.body.insertBefore(reviewsContainer, document.querySelector('footer'));

// Форма добавления отзыва
const form = document.createElement('form');
form.innerHTML = `
    <h2>Добавить отзыв</h2>
    <input type="text" placeholder="Имя" required class="review-input">
    <textarea placeholder="Текст отзыва" required class="review-input"></textarea>
    <input type="number" min="1" max="5" placeholder="Оценка" required class="review-input">
    <button type="submit">Отправить</button>
    <div class="error-message" style="color: red;"></div>
`;
form.style.margin = '20px';
document.body.insertBefore(form, reviewsContainer);

// Элементы управления
const controls = document.createElement('div');
controls.innerHTML = `
    Сортировать по: 
    <select id="sort">
        <option value="date">Дате</option>
        <option value="rating">Оценке</option>
    </select>
    
    Фильтр по оценке: 
    <input type="number" min="1" max="5" id="filter" placeholder="мин. оценка">
`;
document.body.insertBefore(controls, reviewsContainer);

let currentSort = 'date';
let currentFilter = 1;

// Рендер отзывов
function renderReviews() {
    const filtered = reviews.filter(r => r.rating >= currentFilter);
    const sorted = filtered.sort((a, b) =>
        currentSort === 'date' ? b.date - a.date : b.rating - a.rating
    );

    reviewsContainer.innerHTML = sorted.map(review => `
        <div class="review" style="border: 1px solid #ccc; padding: 10px; margin: 10px;">
            <h3>${review.name} (Оценка: ${review.rating})</h3>
            <p>${review.text}</p>
            <small>${review.date.toLocaleDateString()}</small>
        </div>
    `).join('');
}

// Обработчики событий
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputs = form.querySelectorAll('.review-input');
    const error = form.querySelector('.error-message');

    const [name, text, rating] = [...inputs].map(i => i.value.trim());

    if (!name || !text || !rating || rating < 1 || rating > 5) {
        error.textContent = 'Заполните все поля корректно!';
        return;
    }

    error.textContent = '';
    reviews.push({
        name,
        text,
        rating: +rating,
        date: new Date()
    });

    inputs.forEach(i => i.value = '');
    renderReviews();
});

document.getElementById('sort').addEventListener('change', (e) => {
    currentSort = e.target.value;
    renderReviews();
});

document.getElementById('filter').addEventListener('input', (e) => {
    currentFilter = Math.max(1, Math.min(5, e.target.value || 1));
    renderReviews();
});

// Первоначальный рендер
renderReviews();

// Добавляем стили для темной темы
const style = document.createElement('style');
style.textContent = `
    .dark-theme {
        background-color: #333;
        color: #fff;
    }
    
    .dark-theme .review,
    .dark-theme form,
    .dark-theme select,
    .dark-theme input,
    .dark-theme textarea {
        background-color: #444;
        color: #fff;
        border-color: #666;
    }
`;
document.head.appendChild(style);
// ... (предыдущий код темы и отзывов остаётся без изменений)

// Добавляем улучшенные стили
const improvedStyles = document.createElement('style');
improvedStyles.textContent = `
    /* Кнопка темы */
    .theme-toggle {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1000;
        padding: 12px 25px;
        border: none;
        border-radius: 30px;
        cursor: pointer;
        font-weight: bold;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        background: linear-gradient(145deg, #ffffff, #e6e6e6);
        color: #333;
    }
    
    .dark-theme .theme-toggle {
        background: linear-gradient(145deg, #555, #333);
        color: #fff;
        box-shadow: 0 4px 15px rgba(255,255,255,0.1);
    }

    /* Форма */
    .review-form {
        max-width: 800px;
        margin: 40px auto;
        padding: 30px;
        border-radius: 15px;
        box-shadow: 0 0 20px rgba(0,0,0,0.1);
        background: #fff;
    }
    
    .review-form h2 {
        margin-top: 0;
        color: #333;
        text-align: center;
    }
    
    .review-input {
        width: 100%;
        padding: 12px;
        margin: 10px 0;
        border: 2px solid #ddd;
        border-radius: 8px;
        font-size: 16px;
        transition: border-color 0.3s ease;
    }
    
    .review-input:focus {
        border-color: coral;
        outline: none;
    }
    
    .review-form button {
        width: 100%;
        padding: 15px;
        background: coral;
        color: white;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-size: 16px;
        transition: background 0.3s ease;
    }
    
    .review-form button:hover {
        background: #ff7f50;
    }

    /* Элементы управления */
    .controls-container {
        max-width: 800px;
        margin: 20px auto;
        padding: 20px;
        display: flex;
        gap: 15px;
        flex-wrap: wrap;
    }
    
    #sort, #filter {
        padding: 10px;
        border: 2px solid #ddd;
        border-radius: 8px;
        font-size: 14px;
        background: white;
    }

    /* Отзывы */
    .review-card {
        max-width: 800px;
        margin: 20px auto;
        padding: 25px;
        border-radius: 12px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        background: white;
        transition: transform 0.3s ease;
    }
    
    .review-card:hover {
        transform: translateY(-5px);
    }
    
    .review-card h3 {
        color: coral;
        margin-top: 0;
    }
    
    .review-card small {
        color: #666;
        font-size: 0.9em;
    }

    /* Тёмная тема */
    .dark-theme .review-form,
    .dark-theme .review-card,
    .dark-theme .controls-container,
    .dark-theme #sort,
    .dark-theme #filter {
        background: #444;
        color: #fff;
        border-color: #666;
    }
    
    .dark-theme .review-card h3 {
        color: #ffa07a;
    }
    
    .dark-theme .review-card small {
        color: #ccc;
    }
    
    .dark-theme .review-form button {
        background: #ff7f50;
    }
    
    .dark-theme .review-input {
        background: #555;
        color: #fff;
    }
`;

document.head.appendChild(improvedStyles);

// Модифицируем созданные элементы
themeToggle.className = 'theme-toggle';

form.className = 'review-form';
controls.className = 'controls-container';

// Обновляем рендер отзывов
function renderReviews() {
    const filtered = reviews.filter(r => r.rating >= currentFilter);
    const sorted = filtered.sort((a, b) =>
        currentSort === 'date' ? b.date - a.date : b.rating - a.rating
    );

    reviewsContainer.innerHTML = sorted.map(review => `
        <div class="review-card">
            <h3>${review.name} ★ ${'★'.repeat(review.rating).padEnd(5, '☆')}</h3>
            <p>${review.text}</p>
            <small>${review.date.toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })}</small>
        </div>
    `).join('');
}

// Обновляем элементы управления
controls.innerHTML = `
    <div style="flex: 1">
        <label>Сортировать по:</label>
        <select id="sort" class="review-input">
            <option value="date">Дате</option>
            <option value="rating">Оценке</option>
        </select>
    </div>
    
    <div style="flex: 1">
        <label>Фильтр по оценке:</label>
        <input type="number" min="1" max="5" 
               id="filter" class="review-input" 
               placeholder="Минимальная оценка">
    </div>
`;

// Инициализация фильтра
document.getElementById('filter').value = 1;

// Первоначальный рендер
renderReviews();

// Добавляем контейнер для формы
const formContainer = document.createElement('div');
formContainer.style.cssText = 'width: 100%; display: flex; justify-content: center;';
formContainer.appendChild(form);
document.body.insertBefore(formContainer, reviewsContainer);