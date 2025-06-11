FROM node:18

WORKDIR /app

# Установим только нужные зависимости (позже будет volume)
COPY package*.json ./
RUN npm install

# Копируем весь проект внутрь контейнера
COPY . .

# Указываем команду запуска
CMD ["npm", "run", "dev"]
