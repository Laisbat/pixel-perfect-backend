# PixelPerfect Backend

Um backend boilerplate API desenvolvido com Node.js, Express, TypeScript e PostgreSQL.

## 📋 Descrição

API RESTful para gerenciamento de usuários, sessões e posts, desenvolvida com as melhores práticas de desenvolvimento backend utilizando TypeScript, Express.js e PostgreSQL como banco de dados.

## 🚀 Tecnologias

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **TypeScript** - Superset do JavaScript com tipagem estática
- **PostgreSQL** - Banco de dados relacional
- **Knex.js** - Query builder para SQL
- **JWT** - Autenticação via JSON Web Tokens
- **Winston** - Sistema de logs
- **Docker** - Containerização
- **Zod** - Validação de dados

## 📁 Estrutura do Projeto

```text
src/
├── app.ts                # Arquivo principal da aplicação
├── @types/               # Definições de tipos TypeScript
├── configs/              # Configurações da aplicação
├── controllers/          # Controladores das rotas
├── databases/            # Configuração do banco de dados
├── helpers/              # Funções auxiliares
├── Interfaces/           # Interfaces TypeScript
├── middlewares/          # Middlewares customizados
├── routes/               # Definição das rotas
└── services/             # Lógica de negócio
    ├── posts/            # Serviços relacionados aos posts
    ├── session/          # Serviços de autenticação
    └── user/             # Serviços de usuário
```

## 🛠️ Funcionalidades

### Autenticação

- Login de usuário
- Refresh token
- Recuperação de senha
- Alteração de senha

### Usuários

- Cadastro de usuário
- Busca de usuário por código
- Ativação/desativação de usuário

### Posts

- Criação de posts
- Busca de posts
- Gerenciamento de posts

## 📋 Pré-requisitos

- Node.js (versão 18 ou superior)
- PostgreSQL
- Docker (opcional)

## 🔧 Instalação

### Instalação Local

1. Clone o repositório:

```bash
git clone https://github.com/Laisbat/pixel-perfect-backend.git
cd pixel-perfect-backend
```

2. Instale as dependências:

```bash
npm install
```

3. Configure as variáveis de ambiente:

```bash
cp .env.example .env
```

4. Configure as variáveis no arquivo `.env`:

```env
NODE_ENV=development
APP_PORT=3333

# Database
DATABASE_CLIENT=pg
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_db_user
DB_NAME=db_api
DB_PASSWORD=your_db_password

# JWT Secrets
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
ACCESS_TOKEN_EXPIRATION=15m
```

5. Execute as migrações do banco de dados:

```bash
npm run migrate
```

6. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

### Instalação com Docker

1. Execute com Docker Compose:

```bash
docker-compose up -d
```

## 🚀 Scripts Disponíveis

- `npm run dev` - Inicia o servidor em modo de desenvolvimento
- `npm run build` - Gera o build de produção
- `npm start` - Inicia o servidor em produção
- `npm test` - Executa os testes

## 📡 Endpoints da API

### Base URL

```text
http://localhost:3002
```

### Rotas Principais

#### Informações da API

- `GET /` ---> Informações da API

#### Sessão

- `POST /session/login` ------------------> Login do usuário
- `POST /session/refresh` ---------------> Renovar token
- `POST /session/recover-password` ---> Recuperar senha
- `PUT /session/change-password` ------> Alterar senha

#### Usuários

- `POST /users` --------------------> Cadastrar usuário
- `POST /users/:cod` --------------> Atualizar usuário
- `GET /users/:cod`  ---------------> Buscar usuário por código
- `PUT /users/:cod/activate` ---> Ativar/desativar usuário

#### Posts (Requer Autenticação)

- `GET /posts` -------> Listar posts
- `POST /posts` ------> Criar post
- `POST /posts/:id` --> Atualizar post
- `GET /posts/:id` ----> Buscar post por ID

## 🔐 Autenticação

A API utiliza JWT (JSON Web Tokens) para autenticação. Para acessar rotas protegidas, inclua o token no header:

```text
Authorization: Bearer <seu_jwt_token>
```

## 🗃️ Banco de Dados

O projeto utiliza PostgreSQL como banco de dados principal com Knex.js como query builder para gerenciar as operações SQL.

### Configuração do Banco

- Execute o arquivo `init.sql` para criar a estrutura inicial
- Configure as variáveis de ambiente do banco de dados
- Execute as migrações se disponíveis

## 📝 Logs

O sistema utiliza Winston para gerenciamento de logs:

- Logs de info: `logs/info.log` e `logs/info.json`
- Logs de erro: `logs/error.log` e `logs/error.json`

## 🐳 Docker

O projeto inclui:

- `Dockerfile` - Configuração do container da aplicação
- `docker-compose.yml` - Orquestração dos serviços (app + PostgreSQL)

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença ISC. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Autor

**Laís Batista** - Desenvolvimento inicial

---

**Desenvolvimento:** @PIXELPERFECT @Laisbat