<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo isset($pageTitle) ? $pageTitle : 'МедЦентр Здоровье'; ?></title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header class="header">
        <div class="header__container">
            <div class="header__logo logo">
                <img class="logo__image" src="logo.svg" alt="МедЦентр Здоровье">
                <h1 class="logo__text">МедЦентр Здоровье</h1>
            </div>
            <nav class="header__nav nav">
                <ul class="nav__list">
                    <li class="nav__item"><a href="index.php#news" class="nav__link">Новости</a></li>
                    <li class="nav__item"><a href="index.php#services" class="nav__link">Услуги</a></li>
                    <li class="nav__item"><a href="index.php#doctors" class="nav__link">Специалисты</a></li>
                    <li class="nav__item"><a href="index.php#schedule" class="nav__link">Расписание</a></li>
                    <li class="nav__item"><a href="appointment.php" class="nav__link">Запись к врачу</a></li>
                    <li class="nav__item"><a href="index.php#contacts" class="nav__link">Контакты</a></li>
                </ul>
            </nav>
        </div>
    </header>
