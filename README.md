<<<<<<< HEAD
![TalTech Logo](images/tal-tech.png)

# TALLINNA TEHNIKAÜLIKOOL

### INSENERITEADUSKOND

**Virumaa kolledž**

**RAM0541 Veebiprogrammeerimine** _(N. Ivleva)_

### ** Технологии **

Node.js — среда выполнения JavaScript.<br>
Express.js — фреймворк для создания веб-приложений.<br>
Sequelize — ORM для работы с базой данных.<br>
PostgreSQL — реляционная база данных.<br>
REST API — для взаимодействия с клиентской частью.<br>

📂 **Project_2/**

    📂 **config**
        📄 database.js # Конфигурация базы данных

    📂 **controllers**
        📄 actorController.js # Контроллер для актёров
        📄 categoryController.js # Контроллер для категорий
        📄 filmActorController.js # Контроллер для связи фильмов и актёров
        📄 filmController.js # Контроллер для фильмов

    📂 **CSS**
    📂 **images**

    📂 **models**
        📄 actor.js # Модель актёра
        📄 category.js # Модель категории
        📄 film_actor.js # Модель связи фильмов и актёров
        📄 film_category.js # Модель связи фильмов и категорий
        📄 film.js # Модель фильма
        📄 init-models.js # Инициализация моделей
        📄 language.js # Модель языка

    📂 **node_modules** # Установленные зависимости

    📂 **routes**
        📄 actorRoutes.js # Маршруты для актёров
        📄 categoryRoutes.js # Маршруты для категорий
        📄 filmActorRoutes.js # Маршруты для связи фильмов и актёров
        📄 filmRoutes.js # Маршруты для фильмов

        📄 .env # Переменные окружения
        📄 .gitignore # Игнорируемые файлы для Git
        📄 index.html # Главная страница
        📄 index.js # Точка входа в приложение
        📄 package-lock.json # Зависимости (автоматически генерируется)
        📄 package.json # Зависимости и скрипты

## Привмер запроса

1. ## Категории (Categories)<br>
    • GET /api/categories — Получить все категории.<br>
    • GET /api/categories/count — Получить количество категорий.<br>
    • GET /api/categories/search/:name — Поиск категорий по названию (без учета регистра).<br>
    • GET /api/categories/:id — Получить категорию по ID.<br>
    • POST /api/categories — Создать новую категорию.<br>
    • PUT /api/categories/:id — Обновить категорию по ID.<br>
    • DELETE /api/categories/:id — Удалить категорию по ID.<br>
2. ## Актеры (Actors)<br>
    • GET /api/actor — Получить всех актеров.<br>
    • GET /api/actor/count — Получить количество актеров.<br>
    • GET /api/actor/search/:name — Поиск актеров по имени (без учета регистра).<br>
    • GET /api/actor/:id — Получить актера по ID.<br>
    • POST /api/actor — Создать нового актера.<br>
    • PUT /api/actor/:id — Обновить актера по ID.<br>
    • DELETE /api/actor/:id — Удалить актера по ID.<br>
3. ## Фильмы (Films)<br>
    • GET /api/film — Получить все фильмы.<br>
    • GET /api/film/count — Получить количество фильмов.<br>
    • GET /api/film/search/: title — Поиск фильмов по названию (без учета регистра).<br>
    • GET /api/film/:id — Получить фильм по ID.<br>
    • GET /api/film/language/: language_id— Получить фильм по языку.<br>
    • GET /api/film/category/: category_id — Получить фильм категории.<br>
    • POST /api/film — Создать новый фильм.<br>
    • PUT /api/film/:id — Обновить фильм по ID.<br>
    • DELETE /api/film/:id — Удалить фильм по ID.<br>
4. ## Связь фильмов и актеров (Film Actors)<br>
    • GET /api/film_actors — Получить все связи фильмов и актеров.<br>
    • GET /api/film_actors/:id — Получить связь фильма и актера по ID.<br>
    • POST /api/film_actors — Создать новую связь фильма и актера.<br>
    • PUT /api/film_actors/:id — Обновить связь фильма и актера по ID.<br>
    • DELETE /api/film_actors/:id — Удалить связь фильма и актера по ID.<br>
    • GET /api/film_actors/actor/:actor_id — Получить фильмы по ID актера.<br>
    • GET /api/film_actors/film/:film_id — Получить актеров по ID фильма.<br>

=======
Проект: Управление категориями фильмов
Этот проект представляет собой RESTful API для управления категориями фильмов. Он позволяет создавать, читать, обновлять и удалять категории, а также выполнять поиск по имени.

Технологии
Node.js — среда выполнения JavaScript.<br>
Express.js — фреймворк для создания веб-приложений.<br>
Sequelize — ORM для работы с базой данных.<br>
PostgreSQL — реляционная база данных.<br>
