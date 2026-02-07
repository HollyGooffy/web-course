<?php
require_once 'config.php';

// Получение новостей из базы данных
$pdo = getDBConnection();
$newsStmt = $pdo->query("SELECT * FROM news ORDER BY date DESC");
$newsList = $newsStmt->fetchAll();

// Получение специалистов из базы данных
$doctorsStmt = $pdo->query("SELECT * FROM doctors ORDER BY id");
$doctorsList = $doctorsStmt->fetchAll();

// Установка локали для русского языка
setlocale(LC_TIME, 'ru_RU.UTF-8', 'rus_RUS.UTF-8', 'Russian_Russia.1251');

// Получение текущей даты и дня недели
$currentDate = date('d.m.Y');
$daysOfWeek = [
    'Sunday' => 'Воскресенье',
    'Monday' => 'Понедельник',
    'Tuesday' => 'Вторник',
    'Wednesday' => 'Среда',
    'Thursday' => 'Четверг',
    'Friday' => 'Пятница',
    'Saturday' => 'Суббота'
];
$currentDayEng = date('l');
$currentDay = $daysOfWeek[$currentDayEng];

$pageTitle = 'МедЦентр Здоровье - Главная';
include 'includes/header.php';
?>

    <main class="main">
        <section class="hero">
            <div class="hero__container">
                <h2 class="hero__title">Ваше здоровье - наша забота</h2>
                <p class="hero__subtitle">Современная медицинская помощь с заботой о каждом пациенте</p>
                <a href="appointment.php" class="hero__button">
                    <span class="hero__button-icon">📅</span>
                    <span class="hero__button-text">Записаться на прием</span>
                    <span class="hero__button-arrow">→</span>
                </a>
                <div class="hero__date">
                    <p style="font-size: 1.2rem; margin-top: 1.5rem; opacity: 0.95;">
                        Сегодня: <strong><?php echo $currentDay; ?></strong>, <?php echo $currentDate; ?>
                    </p>
                </div>
            </div>
        </section>

        <section class="news" id="news">
            <div class="news__container">
                <h2 class="news__title">Новости и акции</h2>
                <div class="news__grid">
                    <?php foreach ($newsList as $news): ?>
                    <article class="news-card">
                        <img class="news-card__image" src="<?php echo htmlspecialchars($news['image']); ?>" alt="<?php echo htmlspecialchars($news['title']); ?>">
                        <div class="news-card__content">
                            <h3 class="news-card__title"><?php echo htmlspecialchars($news['title']); ?></h3>
                            <p class="news-card__date"><?php echo date('d F Y', strtotime($news['date'])); ?></p>
                            <p class="news-card__text"><?php echo htmlspecialchars($news['content']); ?></p>
                        </div>
                    </article>
                    <?php endforeach; ?>
                </div>
            </div>
        </section>

        <section class="services" id="services">
            <div class="services__container">
                <h2 class="services__title">Наши услуги</h2>
                <div class="services__grid">
                    <div class="service-category">
                        <h3 class="service-category__title">Терапевтические услуги</h3>
                        <ul class="service-category__list">
                            <li class="service-category__item">Первичный прием терапевта</li>
                            <li class="service-category__item">Повторная консультация</li>
                            <li class="service-category__item">Диспансеризация взрослых</li>
                            <li class="service-category__item">Профилактические осмотры</li>
                            <li class="service-category__item">Оформление медицинских справок</li>
                        </ul>
                    </div>

                    <div class="service-category">
                        <h3 class="service-category__title">Педиатрия</h3>
                        <ul class="service-category__list">
                            <li class="service-category__item">Консультация педиатра</li>
                            <li class="service-category__item">Наблюдение детей до года</li>
                            <li class="service-category__item">Вакцинация по календарю</li>
                            <li class="service-category__item">Оформление карты в детский сад/школу</li>
                        </ul>
                    </div>

                    <div class="service-category">
                        <h3 class="service-category__title">Кардиология</h3>
                        <ol class="service-category__list service-category__list--ordered">
                            <li class="service-category__item">ЭКГ (электрокардиография)</li>
                            <li class="service-category__item">Холтеровское мониторирование</li>
                            <li class="service-category__item">Эхокардиография (УЗИ сердца)</li>
                            <li class="service-category__item">Консультация кардиолога</li>
                        </ol>
                    </div>

                    <div class="service-category">
                        <h3 class="service-category__title">Лабораторная диагностика</h3>
                        <ul class="service-category__list">
                            <li class="service-category__item">Общий анализ крови</li>
                            <li class="service-category__item">Биохимический анализ крови</li>
                            <li class="service-category__item">Анализы на гормоны</li>
                            <li class="service-category__item">Общий анализ мочи</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        <section class="doctors" id="doctors">
            <div class="doctors__container">
                <h2 class="doctors__title">Наши специалисты</h2>
                <div class="doctors__grid">
                    <?php foreach ($doctorsList as $doctor): ?>
                    <div class="doctor-card">
                        <img class="doctor-card__photo" src="<?php echo htmlspecialchars($doctor['photo']); ?>" alt="<?php echo htmlspecialchars($doctor['name']); ?>">
                        <h3 class="doctor-card__name"><?php echo htmlspecialchars($doctor['name']); ?></h3>
                        <p class="doctor-card__specialty"><?php echo htmlspecialchars($doctor['specialty']); ?></p>
                        <p class="doctor-card__experience">Стаж: <?php echo $doctor['experience']; ?> лет</p>
                    </div>
                    <?php endforeach; ?>
                </div>
            </div>
        </section>

        <section class="schedule" id="schedule">
            <div class="schedule__container">
                <h2 class="schedule__title">Расписание работы специалистов</h2>
                <div class="schedule__table-wrapper">
                    <table class="schedule-table">
                        <thead class="schedule-table__head">
                            <tr class="schedule-table__row">
                                <th class="schedule-table__header">Специалист</th>
                                <th class="schedule-table__header">Понедельник</th>
                                <th class="schedule-table__header">Вторник</th>
                                <th class="schedule-table__header">Среда</th>
                                <th class="schedule-table__header">Четверг</th>
                                <th class="schedule-table__header">Пятница</th>
                                <th class="schedule-table__header">Суббота</th>
                                <th class="schedule-table__header">Воскресенье</th>
                            </tr>
                        </thead>
                        <tbody class="schedule-table__body">
                            <tr class="schedule-table__row">
                                <td class="schedule-table__cell schedule-table__cell--doctor">Иванова Е.П.<br><span>Терапевт</span></td>
                                <td class="schedule-table__cell schedule-table__cell--working">9:00 - 17:00</td>
                                <td class="schedule-table__cell schedule-table__cell--working">9:00 - 17:00</td>
                                <td class="schedule-table__cell schedule-table__cell--working">9:00 - 17:00</td>
                                <td class="schedule-table__cell schedule-table__cell--working">9:00 - 17:00</td>
                                <td class="schedule-table__cell schedule-table__cell--working">9:00 - 15:00</td>
                                <td class="schedule-table__cell schedule-table__cell--weekend">Выходной</td>
                                <td class="schedule-table__cell schedule-table__cell--weekend">Выходной</td>
                            </tr>
                            <tr class="schedule-table__row">
                                <td class="schedule-table__cell schedule-table__cell--doctor">Смирнов А.В.<br><span>Кардиолог</span></td>
                                <td class="schedule-table__cell schedule-table__cell--working">10:00 - 18:00</td>
                                <td class="schedule-table__cell schedule-table__cell--weekend">Выходной</td>
                                <td class="schedule-table__cell schedule-table__cell--working">10:00 - 18:00</td>
                                <td class="schedule-table__cell schedule-table__cell--working">10:00 - 18:00</td>
                                <td class="schedule-table__cell schedule-table__cell--working">10:00 - 18:00</td>
                                <td class="schedule-table__cell schedule-table__cell--working">10:00 - 14:00</td>
                                <td class="schedule-table__cell schedule-table__cell--weekend">Выходной</td>
                            </tr>
                            <tr class="schedule-table__row">
                                <td class="schedule-table__cell schedule-table__cell--doctor">Петрова М.С.<br><span>Педиатр</span></td>
                                <td class="schedule-table__cell schedule-table__cell--working">8:00 - 16:00</td>
                                <td class="schedule-table__cell schedule-table__cell--working">8:00 - 16:00</td>
                                <td class="schedule-table__cell schedule-table__cell--working">8:00 - 16:00</td>
                                <td class="schedule-table__cell schedule-table__cell--working">8:00 - 16:00</td>
                                <td class="schedule-table__cell schedule-table__cell--working">8:00 - 16:00</td>
                                <td class="schedule-table__cell schedule-table__cell--working">9:00 - 13:00</td>
                                <td class="schedule-table__cell schedule-table__cell--weekend">Выходной</td>
                            </tr>
                            <tr class="schedule-table__row">
                                <td class="schedule-table__cell schedule-table__cell--doctor">Козлов Д.А.<br><span>Невролог</span></td>
                                <td class="schedule-table__cell schedule-table__cell--working">11:00 - 19:00</td>
                                <td class="schedule-table__cell schedule-table__cell--working">11:00 - 19:00</td>
                                <td class="schedule-table__cell schedule-table__cell--weekend">Выходной</td>
                                <td class="schedule-table__cell schedule-table__cell--working">11:00 - 19:00</td>
                                <td class="schedule-table__cell schedule-table__cell--working">11:00 - 19:00</td>
                                <td class="schedule-table__cell schedule-table__cell--weekend">Выходной</td>
                                <td class="schedule-table__cell schedule-table__cell--weekend">Выходной</td>
                            </tr>
                            <tr class="schedule-table__row">
                                <td class="schedule-table__cell schedule-table__cell--doctor">Соколова А.И.<br><span>УЗИ</span></td>
                                <td class="schedule-table__cell schedule-table__cell--working">9:00 - 17:00</td>
                                <td class="schedule-table__cell schedule-table__cell--working">9:00 - 17:00</td>
                                <td class="schedule-table__cell schedule-table__cell--working">9:00 - 17:00</td>
                                <td class="schedule-table__cell schedule-table__cell--working">9:00 - 17:00</td>
                                <td class="schedule-table__cell schedule-table__cell--working">9:00 - 17:00</td>
                                <td class="schedule-table__cell schedule-table__cell--working">9:00 - 15:00</td>
                                <td class="schedule-table__cell schedule-table__cell--weekend">Выходной</td>
                            </tr>
                            <tr class="schedule-table__row">
                                <td class="schedule-table__cell schedule-table__cell--doctor">Волков И.Н.<br><span>Эндокринолог</span></td>
                                <td class="schedule-table__cell schedule-table__cell--working">10:00 - 18:00</td>
                                <td class="schedule-table__cell schedule-table__cell--working">10:00 - 18:00</td>
                                <td class="schedule-table__cell schedule-table__cell--working">10:00 - 18:00</td>
                                <td class="schedule-table__cell schedule-table__cell--weekend">Выходной</td>
                                <td class="schedule-table__cell schedule-table__cell--working">10:00 - 18:00</td>
                                <td class="schedule-table__cell schedule-table__cell--weekend">Выходной</td>
                                <td class="schedule-table__cell schedule-table__cell--weekend">Выходной</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>

        <section class="contacts" id="contacts">
            <div class="contacts__container">
                <h2 class="contacts__title">Контакты</h2>
                <div class="contacts__info">
                    <div class="contacts__item">
                        <h3 class="contacts__subtitle">Адрес</h3>
                        <p class="contacts__text">г. Москва, ул. Медицинская, д. 15</p>
                        <p class="contacts__text">м. Проспект Мира</p>
                    </div>
                    <div class="contacts__item">
                        <h3 class="contacts__subtitle">Телефон</h3>
                        <p class="contacts__text">+7 (495) 123-45-67</p>
                        <p class="contacts__text">+7 (495) 123-45-68</p>
                    </div>
                    <div class="contacts__item">
                        <h3 class="contacts__subtitle">Email</h3>
                        <p class="contacts__text">info@medcentr-zdorovie.ru</p>
                        <p class="contacts__text">zapisy@medcentr-zdorovie.ru</p>
                    </div>
                    <div class="contacts__item">
                        <h3 class="contacts__subtitle">Режим работы</h3>
                        <p class="contacts__text">Пн-Пт: 8:00 - 20:00</p>
                        <p class="contacts__text">Сб: 9:00 - 18:00</p>
                        <p class="contacts__text">Вс: выходной</p>
                    </div>
                </div>
                <div class="contacts__map" id="map">
                    <iframe class="contacts__map-frame" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2245.6087!2d37.6173!3d55.7558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTXCsDQ1JzIwLjkiTiAzN8KwMzcnMDIuMyJF!5e0!3m2!1sru!2sru!4v1234567890" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
                </div>
            </div>
        </section>
    </main>

<?php include 'includes/footer.php'; ?>
