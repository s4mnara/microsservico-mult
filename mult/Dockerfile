FROM node:18-alpine

WORKDIR /app

# Copia apenas os arquivos de dependências
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia o restante do código
COPY . .

EXPOSE 3000
CMD ["node", "index.js"]
