--Личность
create TABLE person(
    --Уникальный номер
    id SERIAL NOT NULL PRIMARY KEY,
    --Фамилия
    surname TEXT NOT NULL,
    --Имя
    name TEXT NOT NULL,
    --Отчество
    patronymic TEXT NOT NULL,
    --Дата рождения
    date_birth TEXT NOT NULL,
    --Вероисповедание
    religion TEXT NOT NULL,
    --Происхождение
    origin TEXT NOT NULL,
    --Уровень образования
    level_education TEXT NOT NULL,
    --Учебное учреждение
    educational_institution TEXT NOT NULL,
    --Расположение учебного учреждения
    location_educational_institution TEXT NOT NULL,
    --Имущество
    property TEXT NOT NULL,
    --Награды
    awards TEXT NOT NULL,
    --Жалование
    salary TEXT NOT NULL,
    --Семейное положение
    marital_status TEXT NOT NULL,
    --Отпуска, отставки, штрафы, суды, военные походы
    other TEXT NOT NULL
);
--Деятельность
create TABLE activity(
    --Уникальный номер
    id SERIAL NOT NULL PRIMARY KEY,
    --Уникальный номер Личности
    person_id SERIAL NOT NULL,
    --Описание деятельности
    description TEXT NOT NULL,
    FOREIGN KEY (person_id) REFERENCES person (id)
);
--Карьера
create TABLE career(
    --Уникальный номер
    id SERIAL NOT NULL PRIMARY KEY,
    --Уникальный номер Личности
    person_id SERIAL NOT NULL,
    --Дата начала
    start_date TEXT,
    --Дата окончания
    end_date TEXT,
    --Должность
    post TEXT,
    --Место работы
    place TEXT,
    FOREIGN KEY (person_id) REFERENCES person (id)
);
--Чин
create TABLE rank(
    --Уникальный номер
    id SERIAL NOT NULL PRIMARY KEY,
    --Уникальный номер Личности
    person_id SERIAL NOT NULL,
    --Дата начала
    start_date TEXT,
    --Дата окончания
    end_date TEXT,
    --Степень
    degree TEXT,
    --Название
    name TEXT,
    FOREIGN KEY (person_id) REFERENCES person (id)
);

create TABLE place(
    id SERIAL NOT NULL PRIMARY KEY,
    name TEXT,
    description TEXT,
    longitude decimal,
    latitude decimal
);


create TABLE activity_place(
    id SERIAL NOT NULL PRIMARY KEY,

    activity_id SERIAL NOT NULL,
    place_id SERIAL NOT NULL,

    FOREIGN KEY (activity_id) REFERENCES activity (id),
    FOREIGN KEY (place_id) REFERENCES place (id)
);

activity.person_id, person.id, career.person_id, rank.person_id, activity_place.activity_id, place.id 

SELECT * FROM activity, person, career, rank, activity_place, place
WHERE activity.person_id = '59'
AND person.id = '59'
AND career.person_id = '59'
AND rank.person_id = '59';