# Majestic Servers Monitor

🖥️ Electron-приложение для отображения онлайн статуса серверов **Majestic** в виде веб-интерфейса.

## 📁 Структура проекта
├── web/ # Фронтенд (HTML/CSS/JS)<br>
├── main.js # Главный процесс Electron<br>
├── preload.js # Preload скрипт (для безопасного доступа к Node API)<br>
├── package.json # Зависимости и настройки проекта<br>
├── package-lock.json # Автоматически сгенерированный lock-файл<br>
└── README.md # Документация<br>


## 🚀 Запуск

### 1. Клонируй репозиторий

```bash
git clone https://github.com/твой-юзернейм/majestic-electron-app.git
cd majestic-electron-app

Убедись, что у тебя установлен Node.js (рекомендуемая версия 16+):

npm install

npm start

Сборка 
Для сборки приложения под конкретную платформу можно использовать Electron Forge или electron-builder:

npm install --save-dev @electron-forge/cli
npx electron-forge import
npm run make
```
<b>preload<b>
![image](https://github.com/user-attachments/assets/161a634a-e3b2-4af3-ba6a-f459a88cd5d5)
<b>main<b>
![image](https://github.com/user-attachments/assets/f8a798f4-8da0-4ac8-9a72-2db845d7e6a2)
<b>select server<b>
![image](https://github.com/user-attachments/assets/22d92af3-d1a0-4a84-b02b-1fccf8d9d284)
