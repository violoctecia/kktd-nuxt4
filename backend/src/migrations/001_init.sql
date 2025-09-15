-- Таблица "О колледже"
CREATE TABLE IF NOT EXISTS about (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    text TEXT NOT NULL,
    img TEXT
);

-- Таблица новости
CREATE TABLE IF NOT EXISTS news (
    id SERIAL PRIMARY KEY,
    img TEXT NOT NULL,
    alt TEXT NOT NULL,
    date TEXT NOT NULL,
    title TEXT NOT NULL,
    text TEXT NOT NULL,
    slug TEXT NOT NULL,
    iso_date TEXT NOT NULL,
    categories TEXT[] NOT NULL,
    content TEXT NOT NULL
);

-- Таблица FAQ
CREATE TABLE IF NOT EXISTS faq (
    id SERIAL PRIMARY KEY,
    question TEXT NOT NULL,
    answer TEXT NOT NULL
);

-- Таблица зачисленные
CREATE TABLE IF NOT EXISTS enrolled (
    id SERIAL PRIMARY KEY,
    full_name TEXT NOT NULL,
    specialty TEXT NOT NULL,
    group_name TEXT NOT NULL
);

-- Таблица рейтинга
CREATE TABLE IF NOT EXISTS rating (
    id SERIAL PRIMARY KEY,
    full_name TEXT NOT NULL,
    score INT NOT NULL,
    specialty TEXT NOT NULL
);

-- Таблица план приёма
CREATE TABLE IF NOT EXISTS admission_plan (
    id SERIAL PRIMARY KEY,
    specialty TEXT NOT NULL,
    qualification TEXT NOT NULL,
    form TEXT NOT NULL,
    duration TEXT NOT NULL,
    budget_places INT NOT NULL,
    paid_places INT NOT NULL,
    cost INT NOT NULL,
    accreditation BOOLEAN NOT NULL
);
