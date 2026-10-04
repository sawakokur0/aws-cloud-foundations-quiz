# Тренажёр к мидтермам

Неофициальный тренажёр для самоподготовки по двум курсам. Статический сайт без сборки, прогресс хранится в localStorage браузера.

- `index.html` — главная: оба курса, сводка прогресса и ошибок, быстрые ссылки на разделы.
- `aws/` — AWS Academy Cloud Foundations (ACFv2): knowledge checks M01–M10, вопросы по лабам, режим к Midterm Quiz (недели 1–6),
  пробный экзамен, конспекты по лабам и сборник ключевых моментов слайдов M01–M10.
  `index.html` + `data-kc.js`, `data-labs.js`, `notes-did.js`, `notes-how.js`, `modules-notes.js`.
  Прямые ссылки: `aws/#mid`, `#kc`, `#lab`, `#exam`, `#notes`, `#modules`, `#mistakes`.
- `research-methods/` — Research Methods in IT (лекции 1–4.2): главная курса с картой лекций и режимами, конспекты, ключевое,
  тест на 183 вопроса, пробный мидтерм на 40 вопросов и карточки. Прямые ссылки: `#home`, `#notes`, `#keys`, `#quiz`, `#cards`.

Главная берёт числа AWS из `aws/data-*.js`; числа Research Methods (вопросы по лекциям, карточки) записаны в `index.html`
константами `RM_LECS` и `RM_CARDS`. Если меняешь вопросы RM, обнови их тоже.
