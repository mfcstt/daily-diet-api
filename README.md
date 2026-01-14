# 🥗 Daily Diet API

API RESTful para controle de dieta diária, permitindo o registro e gerenciamento de refeições.

## 📋 Sobre o Projeto

A Daily Diet API é uma aplicação backend desenvolvida para ajudar usuários a controlar sua alimentação diária. Com ela é possível registrar refeições, marcar se estão dentro ou fora da dieta, visualizar métricas do progresso e gerenciar completamente o histórico alimentar.

Este projeto foi desenvolvido como parte do desafio do módulo II do bootcamp Ignite da Rocketseat, focando em Node.js, TypeScript e conceitos fundamentais de APIs REST.

## ✨ Funcionalidades

### Usuários
- ✅ Criar um novo usuário
- ✅ Identificação de usuários entre requisições via session_id (cookies)

### Refeições
- ✅ Registrar uma refeição com as seguintes informações:
  - Nome
  - Descrição
  - Data e Hora
  - Está dentro ou não da dieta
- ✅ Editar uma refeição (todos os dados acima)
- ✅ Apagar uma refeição
- ✅ Listar todas as refeições de um usuário
- ✅ Visualizar uma única refeição

### Métricas
- ✅ Recuperar métricas de um usuário:
  - Quantidade total de refeições registradas
  - Quantidade total de refeições dentro da dieta
  - Quantidade total de refeições fora da dieta
  - Melhor sequência de refeições dentro da dieta

## 🔒 Regras de Negócio

- As refeições devem ser relacionadas a um usuário
- O usuário só pode visualizar, editar e apagar as refeições que ele criou
- A identificação do usuário é feita através de cookies (session_id)

## 🚀 Tecnologias

Este projeto foi desenvolvido com as seguintes tecnologias:

- [Node.js](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Fastify](https://www.fastify.io/)
- [Knex.js](http://knexjs.org/)
- [SQLite](https://www.sqlite.org/)
- [Zod](https://zod.dev/) - Validação de dados
- [Vitest](https://vitest.dev/) - Testes automatizados
- [TSX](https://github.com/esbuild-kit/tsx) - Execução de TypeScript

## 📦 Instalação

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
- [Git](https://git-scm.com)
- [Node.js](https://nodejs.org/) (versão 18 ou superior)

Além disso, é recomendado ter um editor de código como o [VSCode](https://code.visualstudio.com/).

### Passos para instalação

```bash
# Clone este repositório
$ git clone https://github.com/mfcstt/daily-diet-api.git

# Acesse a pasta do projeto no terminal
$ cd daily-diet-api

# Instale as dependências
$ npm install

# Configure as variáveis de ambiente
# Copie o arquivo .env.example para .env
$ cp .env.example .env

# Execute as migrations para criar o banco de dados
$ npm run knex -- migrate:latest

# Execute a aplicação em modo de desenvolvimento
$ npm run dev

# O servidor iniciará na porta 3333
# Acesse http://localhost:3333
```

## 🧪 Executando os Testes

```bash
# Executar todos os testes
$ npm test

# Executar testes em modo watch
$ npm test:watch

# Gerar relatório de cobertura
$ npm test:coverage
```

## 📝 Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
NODE_ENV=development
DATABASE_URL="./db/app.db"
PORT=3333
```

Para testes, crie um arquivo `.env.test`:

```env
NODE_ENV=test
DATABASE_URL="./db/test.db"
```

## 🛣️ Rotas da API

### Usuários

#### Criar usuário
```http
POST /users
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao@example.com"
}
```

### Refeições

#### Criar refeição
```http
POST /meals
Content-Type: application/json
Cookie: sessionId=seu-session-id

{
  "name": "Café da manhã",
  "description": "Pão integral com ovo",
  "dateTime": "2024-01-15T08:00:00",
  "isOnDiet": true
}
```

#### Listar todas as refeições
```http
GET /meals
Cookie: sessionId=seu-session-id
```

#### Buscar refeição específica
```http
GET /meals/:id
Cookie: sessionId=seu-session-id
```

#### Atualizar refeição
```http
PUT /meals/:id
Content-Type: application/json
Cookie: sessionId=seu-session-id

{
  "name": "Café da manhã completo",
  "description": "Pão integral com ovo e frutas",
  "dateTime": "2024-01-15T08:00:00",
  "isOnDiet": true
}
```

#### Deletar refeição
```http
DELETE /meals/:id
Cookie: sessionId=seu-session-id
```

#### Obter métricas do usuário
```http
GET /meals/metrics
Cookie: sessionId=seu-session-id
```

**Resposta:**
```json
{
  "totalMeals": 10,
  "mealsOnDiet": 8,
  "mealsOffDiet": 2,
  "bestOnDietSequence": 5
}
```

## 📂 Estrutura do Projeto

```
daily-diet-api/
├── db/                      # Banco de dados SQLite
├── src/
│   ├── @types/             # Definições de tipos TypeScript
│   ├── database.ts         # Configuração do Knex
│   ├── env/                # Validação de variáveis de ambiente
│   ├── middlewares/        # Middlewares da aplicação
│   ├── routes/             # Rotas da API
│   │   ├── users.ts
│   │   └── meals.ts
│   ├── app.ts              # Configuração do Fastify
│   └── server.ts           # Inicialização do servidor
├── test/                   # Testes automatizados
├── .env.example            # Exemplo de variáveis de ambiente
├── knexfile.ts             # Configuração do Knex
├── package.json
└── tsconfig.json
```

## 🎯 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev              # Inicia o servidor em modo desenvolvimento

# Build
npm run build           # Compila o projeto TypeScript

# Banco de dados
npm run knex            # CLI do Knex para migrations

# Testes
npm test                # Executa os testes
npm run test:watch      # Executa testes em modo watch
```

## 📚 Conceitos Aplicados

Este projeto aborda conceitos importantes como:

- ✅ Criação de API REST com Node.js e Fastify
- ✅ Utilização de TypeScript
- ✅ Banco de dados relacional com SQLite e Knex.js
- ✅ Migrations para versionamento do banco
- ✅ Validação de dados com Zod
- ✅ Autenticação via cookies
- ✅ Middlewares para validação de sessão
- ✅ Testes automatizados (unitários e E2E)
- ✅ Variáveis de ambiente
- ✅ Query builders
- ✅ Plugins do Fastify

## 🤝 Contribuindo

Contribuições são sempre bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.

## 👨‍💻 Autor

Desenvolvido por [mfcstt](https://github.com/mfcstt)

---

⭐️ Se este projeto te ajudou, considere dar uma estrela!
