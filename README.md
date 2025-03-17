<<<<<<< HEAD
![TalTech Logo](images/tal-tech.png)

# TALLINNA TEHNIKAÜLIKOOL

### INSENERITEADUSKOND

**Virumaa kolledž**

**RAM0541 Veebiprogrammeerimine** _(N. Ivleva)_

### ** Технологии **

Node.js — среда выполнения JavaScript.
Express.js — фреймворк для создания веб-приложений.
Sequelize — ORM для работы с базой данных.
PostgreSQL — реляционная база данных.
REST API — для взаимодействия с клиентской частью.

📂 **Project_2/**

-   📂 **config**
-   📄 `index.html` (главная страница с меню)
-   📂 **controllers**
-   📄categoryController.js # Контроллер для категорий
-   📂 **css** # Стили
-   📂 **images**
-   📄 tal-tech.png # Логотип TalTech
-   📂 **models** # Модели Sequelize
-   📄 actor.js # Модель актёра
-   📄 category.js # Модель категории
-   📄 film_actor.js # Модель связи фильмов и актёров
-   📄 film_category.js # Модель связи фильмов и категорий
-   📄 film.js # Модель фильма
-   📄 init-models.js # Инициализация моделей
-   📄 language.js # Модель языка
-   📂 **node_modules** # Установленные зависимости
-   📂 **routes**
-   📄 categoryRoutes.js # Маршруты для категорий
-   📄 .env # Переменные окружения
-   📄 .gitignore # Игнорируемые файлы для Git
-   📄 index.html # Главная страница (если используется)
-   📄 index.js # Точка входа в приложение
-   📄 package-lock.json # Зависимости (автоматически генерируется)
-   📄 package.json # Зависимости и скрипты
-   📄 README.md # Документация проекта
-   📄 Untitled-1.pgsql # SQL-файл (если используется)

## Привмер запроса

### Метод: GET

/api/categories/search?name=Action Поиск категорий по имени<br>
/api/categories Получить все категории<br>
/api/categories/1 Получить категорию по ID<br>
/api/categories/search?name=Action Поиск категорий по имени<br>
/api/categories/count Получить количество категорий<br>

Метод: POST Создать новую категорию
/api/categories
Тело запроса: {"name": "Drama"}
=======
Проект: Управление категориями фильмов
Этот проект представляет собой RESTful API для управления категориями фильмов. Он позволяет создавать, читать, обновлять и удалять категории, а также выполнять поиск по имени.

Технологии
Node.js — среда выполнения JavaScript.
Express.js — фреймворк для создания веб-приложений.
Sequelize — ORM для работы с базой данных.
PostgreSQL — реляционная база данных.

> > > > > > > 8b81fa19ac27273723d6e602b0bdb3c7484047f2
