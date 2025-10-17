# IELTS Mock Test - Telegram Integration

## Обзор
Все IELTS тесты (Listening, Reading, Writing) теперь интегрированы с Telegram ботом для автоматической отправки результатов в группу.

## Настройка
- **ID группы:** -1003120738609
- **Token бота:** 8489597425:AAE9fNvU_gm7jUOIuw3lALmFVTZ3TtT7WVE
- **Пароль для входа:** JAMOL

## Файлы
- `telegram-integration.js` - Основной скрипт для работы с Telegram API
- `Writing.html` - Модифицирован для отправки PDF в Telegram
- `index..html` (Listening) - Модифицирован для отправки результатов в Telegram
- `Reading.html` - Модифицирован для отправки результатов в Telegram

## Формат сообщений

### Writing Test
```
#writing

👤 Candidate: DB
📅 Date: 06.10.2025
⏰ Time: 21:12:08

📄 IELTS Writing Test Results
```
+ PDF файл с результатами

### Listening Test
```
#listening

👤 Candidate: DB
📅 Date: 06.10.2025
⏰ Time: 21:12:08

📄 IELTS Listening Test Results
📊 Score: 35/40
```

### Reading Test
```
#reading

👤 Candidate: DB
📅 Date: 06.10.2025
⏰ Time: 21:12:08

📄 IELTS Reading Test Results
📊 Score: 32/40
```

## Изменения
1. **Удалена загрузка PDF** - теперь результаты отправляются в Telegram
2. **Добавлена интеграция с Telegram API** - автоматическая отправка результатов
3. **Обновлены сообщения** - пользователи видят уведомления об отправке в Telegram
4. **Сохранена функциональность** - все тесты работают как прежде, но результаты идут в Telegram

## Использование
1. Откройте любой тест (Listening, Reading, Writing)
2. Пройдите тест как обычно
3. После завершения результаты автоматически отправятся в Telegram группу
4. PDF файл (только для Writing) будет прикреплен к сообщению

## Требования
- Интернет соединение для отправки в Telegram
- Все файлы должны быть в одной папке
- `telegram-integration.js` должен быть доступен для всех HTML файлов
