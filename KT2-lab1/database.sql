-- Создание базы данных
CREATE DATABASE IF NOT EXISTS medcentr_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE medcentr_db;

-- Таблица новостей
CREATE TABLE IF NOT EXISTS news (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Таблица специалистов
CREATE TABLE IF NOT EXISTS doctors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    specialty VARCHAR(255) NOT NULL,
    experience INT NOT NULL,
    photo VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Таблица записей к врачу
CREATE TABLE IF NOT EXISTS appointments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255),
    doctor_id INT NOT NULL,
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (doctor_id) REFERENCES doctors(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Вставка данных новостей
INSERT INTO news (title, image, date, content) VALUES
('Скидка 20% на комплексную диагностику', 'image/news/complex.png', '2026-01-15', 'Только в феврале! Пройдите полное обследование организма со скидкой 20%. Включает анализы крови, УЗИ и консультацию терапевта.'),
('Новое оборудование для МРТ-диагностики', 'image/news/MRT.jpg', '2026-01-10', 'Мы установили современный МРТ-аппарат последнего поколения. Высокая точность диагностики и комфорт для пациентов.'),
('Программа вакцинации для всей семьи', 'image/news/vak.jpg', '2026-01-05', 'Защитите себя и близких! Доступна вакцинация от гриппа, пневмонии и других заболеваний. Запись по телефону.'),
('Открытие детского отделения', 'image/news/det.jpg', '2026-01-01', 'Рады сообщить об открытии нового детского отделения! Опытные педиатры, игровая зона и дружелюбная атмосфера.');

-- Вставка данных специалистов
INSERT INTO doctors (name, specialty, experience, photo) VALUES
('Иванова Мария Петровна', 'Терапевт, врач высшей категории', 18, 'image/spec/valentina.jpg'),
('Смирнов Андрей Викторович', 'Кардиолог, кандидат медицинских наук', 22, 'image/spec/андрей.jpg'),
('Петрова Мария Сергеевна', 'Педиатр, врач первой категории', 12, 'image/spec/sil.jpg'),
('Волков Дмитрий Волкович', 'Невролог, врач высшей категории', 15, 'image/spec/anton.jpg'),
('Иванова Анна Ивановна', 'Врач УЗИ-диагностики', 10, 'image/spec/sasavot.jpg'),
('Волков Игорь Волкович', 'Эндокринолог', 14, 'image/spec/Steve.jpg');
