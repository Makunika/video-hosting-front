# Курсовая работа по предмету Web-программирование

Работа представляет собой аналог видео хостинга как youtube. Почти весь основной функционал ютуба был реализован.

Реализована система администрирования, то есть пользователь с правом администратора может удалять и видео, и комментарии, и пользователей.

Также есть возможность создать приватное видео: оно не будет появляться на главное странице и в поиске, доступ только по ссылке.

### Код

Backend часть: https://github.com/Makunika/video-hosting

Серверная часть написана на языке Java с использованием фреймворка spring boot.
В качестве базы данных использована СУБД PostgreSQL.

Клиентская часть написана с помощью React на языке JavaScript с использованием фреймворка Material Design.

### Скриншоты работы

Главная страница:

![home page](.img/main.png)

Страницы регистрации и входа:

![login page](.img/login.png)

![register page](.img/register.png)

Страница просмотра видео:

![video page](.img/video.png)

![video page](.img/video2.png)

Страница личного профиля:

![profile page](.img/profile.png)

Страница загрузки нового видео:

![profile page](.img/create_new_video.png)

Страница профиля пользователя, доступное всем:

![profile page](.img/user.png)

Страница профиля пользователя, доступное всем:

![profile page](.img/user.png)

Страница профиля пользователя, доступное всем:

![profile page](.img/user.png)

Если вы зашли под администратора, то у вас появляются дополнительные кнопки на некоторых страницах:

![profile page](.img/userAdmin.png)

![profile page](.img/videoAdmin.png)

Сайт имеет адаптивность на всех страницах:

![profile page](.img/mobile.png)