## Smarket (React, MUi, Typescript)

Простой симулятор биржи с клиент-серверной архитектурой. Взаимодействие с биржей происходит через торговый терминал, который является клиентом в данной архитектуре, а сама биржа - это сервер.

[Приложение](https://pushtotalkme.github.io/Smarket/)

[Код последней версии приложения](https://github.com/PushToTalkMe/Smarket/tree/release)

--------------------------------------

Инструкция:
Приложение включает в себя 1 страницу(домашнюю), состоящую из заголовка, авторизации, формы добавления тикера и списка заявок.
  Функции заголовка:
    - При нажатии на заголовок происходит перенаправение на домашную страницу и перезагрузка приложения.
    - При нажатии на кнопку "Войти", откроется попап и будет предложена форма для авторизации. Подробнее о функционале авторизации в разделе "Функции авторизации".
    - Если пользователь авторизован, то при нажатии на иконку "Билет", откроется попап и будет предложена форма для добавления тикера в список заявок. Подробнее о функционале тикера в разделе "Функции тикера". Иначе будет предложена форма для авторизации.
    
  Функции авторизации:
    - Форма состоит из полей ввода "Логин" и "Пароль".
    - Пользователь задан заранее, поэтому для входа нужно использовать следующие данные:
      - Логин: PushToTalk
      - Пароль: 123456789
    - Если пользователь уже был авторизован и не выходил из аккаунта, то при перезагрузке страницы авторизация не сбросится.
    - При нажатии на затемненную область экрана, попап закроется.
    
  Функции тикера:
    - Форма состоит из выбора актива, объема и кнопок продажи/покупки. Цена рассчитывается автоматически, в зависимости от выбранного актива и заданного объема.
    - При нажатии на одну из кнопок, будет симулироваться отправка 3 сообщений на MockWebSocket, где им будет присвоен ID и 3 разных статуса (в зависимости от типа сообщения), и затем произойдет добавление их в список.
    - Если актив или объем не будут указаны, то будет симулироваться отправка 3 сообщений на MockWebSocket, где им будет присвоен ID и статус Rejected, и затем прозойдет добавление их в список.
    - При нажатии на затемненную область экрана, попап закроется.
    
  Фунции списка заявок:
    - Список заявок представляет собой таблицу, имеющую следующую информацию:
      - идентификатор - ID
      - время создания - Creation Time
      - время последнего изменения статуса - Change Time
      - статус - Status (Active Filled Rejected Cancelled)
      - сторона - Side (Buy Sell)
      - цена - Price
      - объем - Amount
      - торговый инструмент - Instrument
    - Сортировка происходит по всем столбцам, кроме столбца "Торговый инструмент - Instrument". Для этого нужно навести стрелку на заголовок столбца и нажать полупрозрачную стрелку рядом с названием.
    - Пагинация происходит, если количество заявок больше 15. Под таблицей есть стрелки для переключения страниц.
    - При перезагрузке страницы вся информация о заявках будет стерта.
    
--------------------------------------

В нем были реализованы следующие функции:
  - Авторизация
  - Список с информацией по всем заявкам
  - Сортировка заявок
  - Пагинация
  - Добавление тикера, если пользователь авторизован
  - Хранение информации о пользователе при перезагрузке страницы
  
--------------------------------------
