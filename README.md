# Budget Calculator

Простой веб‑калькулятор, который помогает распределять расходы между друзьями во время поездок. Данные хранятся в локальном хранилище браузера.

Откройте `index.html` в браузере, чтобы добавить транзакции и увидеть кто кому сколько должен. Весь JavaScript уже встроен в этот файл.

На странице доступен переключатель, который позволяет выводить либо
оптимизированный список взаиморасчётов, либо прямые долги по каждой
транзакции.

В блоке "Сводка расходов" отображаются две диаграммы: круговая диаграмма
распределения долей и столбчатая диаграмма фактических затрат. Обе диаграммы
строятся при помощи Chart.js, подключённой из CDN. Если библиотеку загрузить не
удаётся, таблицы продолжат работать, просто графики не появятся.

## Импорт и экспорт CSV

В разделе "Транзакции" доступны кнопки для экспорта текущих данных в файл `transactions.csv` и для импорта данных из аналогичного CSV файла. В файле используются колонки `payer`, `amount` и `participants` (участники перечислены через `;`).

## Third-party licenses

This project uses React, ReactDOM, Babel and Chart.js via CDNs. Their MIT licenses are included in the `LICENSES/` directory.
