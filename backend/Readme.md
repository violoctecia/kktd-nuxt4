# README проекта

Этот документ содержит инструкции по настройке и запуску проекта, а также описание доступных API-эндпоинтов.

## Содержание

1. [Запуск проекта](#запуск-проекта)
2. [API-эндпоинты](#api-эндпоинты)
    - [О колледже](#о-колледже)
    - [План приёма](#план-приёма)
    - [Зачисленные абитуриенты](#зачисленные-абитуриенты)
    - [Часто задаваемые вопросы (FAQ)](#часто-задаваемые-вопросы-faq)
    - [Новости](#новости)
    - [Рейтинг абитуриентов](#рейтинг-абитуриентов)

---

## Запуск проекта

### 1. Установка зависимостей

Для установки необходимых зависимостей выполните:

```bash
pnpm install
```

### 2. Настройка переменных окружения

Создайте файл `.env` в корневой папке проекта и настройте его, используя следующие переменные:

```env
PORT=5000
UPLOAD_DIR=uploads
DB_HOST=localhost
DB_PORT=5432
DB_USER=college_user2
DB_PASSWORD=111
DB_NAME=college_db2
```

### 3. Запуск сервера

Для запуска сервера в режиме разработки выполните:

```bash
pnpm dev
```

Сервер будет доступен по адресу:

```
http://localhost:5000
```

---

## API-эндпоинты

### О колледже

Базовый URL: `/api/about`

#### GET `/`

Получить все записи о колледже.

```
GET http://localhost:5000/api/about
```

#### POST `/`

Создать новую запись о колледже.

```
POST http://localhost:5000/api/about
Content-Type: multipart/form-data
Body (form-data):
  title: "О колледже"
  text: "Описание колледжа"
  img: (файл изображения)
```

#### PUT `/:id`

Обновить существующую запись по ID.

```
PUT http://localhost:5000/api/about/1
Content-Type: multipart/form-data
Body (form-data):
  title: "Новое название"
  text: "Обновленное описание"
  img: (файл изображения, опционально)
```

#### DELETE `/:id`

Удалить запись по ID.

```
DELETE http://localhost:5000/api/about/1
```

---

### План приёма

Базовый URL: `/api/admission-plan`

#### GET `/`

Получить все записи плана приёма.

```
GET http://localhost:5000/api/admission-plan
```

#### POST `/`

Создать новую запись плана приёма.

```
POST http://localhost:5000/api/admission-plan
Content-Type: application/json
Body:
{
  "speciality": "09.02.07 Информационные системы",
  "form": "очная",
  "duration": "3 года",
  "budget_places": 20,
  "paid_places": 15,
  "extras": {
    "note": "Дополнительная информация"
  }
}
```

#### PUT `/:id`

Обновить запись плана приёма по ID.

```
PUT http://localhost:5000/api/admission-plan/1
Content-Type: application/json
Body:
{
  "speciality": "09.02.07 ИС",
  "form": "очно-заочная",
  "duration": "3 года",
  "budget_places": 25,
  "paid_places": 10,
  "extras": {}
}
```

#### DELETE `/:id`

Удалить запись плана приёма по ID.

```
DELETE http://localhost:5000/api/admission-plan/1
```

---

### Зачисленные абитуриенты

Базовый URL: `/api/enrolled`

#### GET `/`

Получить всех зачисленных абитуриентов.

```
GET http://localhost:5000/api/enrolled
```

#### GET `/:id`

Получить данные одного абитуриента по ID.

```
GET http://localhost:5000/api/enrolled/1
```

#### POST `/`

Добавить нового зачисленного абитуриента.

```
POST http://localhost:5000/api/enrolled
Content-Type: application/json
Body:
{
  "fio": "Иванов Иван Иванович",
  "birthdate": "2005-03-15",
  "speciality": "09.02.07 Информационные системы",
  "full_name": "ГБПОУ ККТД",
  "status": "рекомендован",
  "documents": {
    "passport": "1234 567890",
    "certificate": "АБ1234567"
  }
}
```

#### PUT `/:id`

Обновить данные абитуриента по ID.

```
PUT http://localhost:5000/api/enrolled/1
Content-Type: application/json
Body:
{
  "fio": "Иванов Иван Иванович",
  "birthdate": "2005-03-15",
  "speciality": "09.02.07 ИС",
  "full_name": "ГБПОУ ККТД",
  "status": "зачислен",
  "documents": {}
}
```

#### DELETE `/:id`

Удалить данные абитуриента по ID.

```
DELETE http://localhost:5000/api/enrolled/1
```

---

### Часто задаваемые вопросы (FAQ)

Базовый URL: `/api/faq`

#### GET `/`

Получить все вопросы и ответы.

```
GET http://localhost:5000/api/faq
```

#### POST `/`

Добавить новый вопрос.

```
POST http://localhost:5000/api/faq
Content-Type: application/json
Body:
{
  "question": "Как поступить?",
  "answer": "Заполнить документы и пройти конкурс.",
  "order_number": 1
}
```

#### PUT `/:id`

Обновить вопрос по ID.

```
PUT http://localhost:5000/api/faq/1
Content-Type: application/json
Body:
{
  "question": "Как правильно поступить?",
  "answer": "Подать заявку онлайн.",
  "order_number": 1
}
```

#### DELETE `/:id`

Удалить вопрос по ID.

```
DELETE http://localhost:5000/api/faq/1
```

---

### Новости

Базовый URL: `/api/news`

#### GET `/`

Получить все новости.

```
GET http://localhost:5000/api/news
```

#### GET `/:id`

Получить одну новость по ID.

```
GET http://localhost:5000/api/news/1
```

#### POST `/`

Создать новую новость.

```
POST http://localhost:5000/api/news
Content-Type: multipart/form-data
Body (form-data):
  img: (файл изображения)
  alt: "Изображение новости"
  date: "2025-09-15"
  title: "Новая новость"
  text: "Текст новости"
  slug: "novaya-novost"
  isoDate: "2025-09-15T00:00:00Z"
  categories: ["События", "Новости"]
  content: "Полный текст новости"
```

#### PUT `/:id`

Обновить новость по ID.

```
PUT http://localhost:5000/api/news/1
Content-Type: multipart/form-data
Body (form-data):
  img: (файл изображения)
  alt: "Обновленное изображение"
  date: "2025-09-16"
  title: "Обновлённая новость"
  text: "Обновлённый текст"
  slug: "novaya-novost-2"
  isoDate: "2025-09-16T00:00:00Z"
  categories: ["Новости"]
  content: "Полный текст обновлённой новости"
```

#### DELETE `/:id`

Удалить новость по ID.

```
DELETE http://localhost:5000/api/news/1
```

---

### Рейтинг абитуриентов

Базовый URL: `/api/rating`

#### GET `/`

Получить все рейтинги абитуриентов.

```
GET http://localhost:5000/api/rating
```

#### POST `/`

Добавить новый рейтинг.

```
POST http://localhost:5000/api/rating
Content-Type: application/json
Body:
{
  "fio": "Иванов Иван Иванович",
  "speciality": "09.02.07 Информационные системы",
  "score": 95.5,
  "year": 2025,
  "extra": {
    "note": "Участник олимпиад"
  }
}
```

#### PUT `/:id`

Обновить рейтинг по ID.

```
PUT http://localhost:5000/api/rating/1
Content-Type: application/json
Body:
{
  "fio": "Иванов И.И.",
  "speciality": "09.02.07 ИС",
  "score": 97,
  "year": 2025,
  "extra": {}
}
```

#### DELETE `/:id`

Удалить рейтинг по ID.

```
DELETE http://localhost:5000/api/rating/1
```
