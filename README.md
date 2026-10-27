# vadimlava.ru — персональный сайт Вадима Лавы (черновик)

Статический одностраничный сайт: чистые HTML, CSS и JS, без сборщиков и зависимостей.

## Структура
- `index.html` — вся страница (разделы: главная, обо мне, направления, занятия и залы, события и проекты, партнёры, контакты)
- `css/style.css`, `js/main.js` — стили и скрипты
- `images/` — логотипы и фото (источники ниже), `fonts/` — шрифты Unbounded и Manrope (лицензия OFL)
- `CNAME` — домен `vadimlava.ru`; `.nojekyll`, `robots.txt`, `sitemap.xml`, `404.html`

В `index.html` места, требующие подтверждения, помечены HTML-комментариями `ЗАГЛУШКА` и `ПРОВЕРИТЬ`.

## Как посмотреть локально
```bash
python3 -m http.server 8000
# открыть http://localhost:8000
```
Для скриншотов: `http://localhost:8000/?static` показывает все блоки без анимации появления.

## Как опубликовать на GitHub Pages
1. Создать репозиторий на GitHub и загрузить в него этот проект (ветка `main`).
2. Settings → Pages → Build and deployment → Source: «Deploy from a branch», Branch: `main`, папка `/ (root)`.
3. Домен: в Settings → Pages → Custom domain указать `vadimlava.ru` (файл `CNAME` уже есть), включить Enforce HTTPS.
4. В DNS домена vadimlava.ru добавить записи:
   - `A` для `@`: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `CNAME` для `www`: `<логин>.github.io`
   Актуальные адреса проверьте в документации GitHub Pages. HTTPS-сертификат выпускается автоматически, обычно за несколько минут или часов после настройки DNS.

## Источники визуала
- Логотип и фото АКБИ — со старого сайта https://wushu-life.tb.ru (файлы с `selstorage.ru`).
- Логотип ПАУК — с https://pawk.ru (`/logo-alliance.png`). Текстовая информация с pawk.ru не использовалась.
- Стиль (чёрный фон, красный акцент #f0070b, шрифты Unbounded и Manrope) — по мотивам Martial Store и ПАУК.
