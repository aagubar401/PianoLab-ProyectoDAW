FROM node:20-slim

# Instalar dependencias necesarias para Chromium
RUN apt-get update && apt-get install -y \
    chromium \
    chromium-driver \
    fonts-liberation \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libatspi2.0-0 \
    libcups2 \
    libdbus-1-3 \
    libdrm2 \
    libgbm1 \
    libgtk-3-0 \
    libnspr4 \
    libnss3 \
    libxcomposite1 \
    libxdamage1 \
    libxfixes3 \
    libxrandr2 \
    libxss1 \
    libxtst6 \
    xdg-utils \
    --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# Puppeteer necesita saber dónde está Chromium
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

ENV GENIUS_API_KEY=bP2FfC7tuaH8et0qDqVPQtKBT5dnBmgM3nvRAYucefs_Pq4-cGW6_AC4c2lz6uT3


EXPOSE 4000

CMD ["npm", "start"]
