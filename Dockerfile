# Använd officiell Node.js v20-build
FROM node:20

# Ange arbetskatalog i containern
WORKDIR /app

# Kopiera package-filer och installera beroenden
COPY package*.json ./
RUN npm install

# Kopiera resten av koden
COPY . .

# Öppna port 3000
EXPOSE 3000

# Starta appen
CMD ["npm", "start"]

