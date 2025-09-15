CREATE TABLE IF NOT EXISTS about (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  text TEXT NOT NULL,
  img TEXT
);

CREATE TABLE IF NOT EXISTS news (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  text TEXT NOT NULL,
  slug TEXT NOT NULL,
  isodate TEXT NOT NULL,
  categories JSONB NOT NULL DEFAULT '[]',
  content TEXT NOT NULL,
  date TEXT NOT NULL,
  alt TEXT,
  img TEXT
);

CREATE TABLE IF NOT EXISTS faq (
  id SERIAL PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  "order" INTEGER
);

CREATE TABLE IF NOT EXISTS enrolled (
  id SERIAL PRIMARY KEY,
  fio TEXT NOT NULL,
  birthdate TEXT,
  speciality TEXT NOT NULL,
  status TEXT,
  documents JSONB
);

CREATE TABLE IF NOT EXISTS admission_plan (
  id SERIAL PRIMARY KEY,
  speciality TEXT NOT NULL,
  form TEXT NOT NULL,
  duration TEXT,
  budget_places INTEGER DEFAULT 0,
  paid_places INTEGER DEFAULT 0,
  extras JSONB
);

CREATE TABLE IF NOT EXISTS rating (
  id SERIAL PRIMARY KEY,
  fio TEXT NOT NULL,
  speciality TEXT NOT NULL,
  score NUMERIC NOT NULL,
  year INTEGER NOT NULL,
  extra JSONB
);
