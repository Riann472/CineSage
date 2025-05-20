# 🎬 CineSage

**CineSage** é um site de recomendações de filmes desenvolvido com **React**, que permite ao usuário explorar títulos e descobrir novas obras com base em preferências. A aplicação se comunica com **uma API própria** (ainda em desenvolvimento, em repositório separado).

---

## 🌐 Projeto dividido em dois repositórios

- 🔵 **Frontend (este repositório)** — Interface do usuário em React
- 🟡 **Backend (API)** — Repositório separado que fornecerá dados sobre os filmes e usuarios

---

## 🚀 Rodando o Frontend (CineSage) localmente

### 1. Clone este repositório

```bash
git clone https://github.com/Riann472/CineSage.git
```

### 2. Acesse a pasta do projeto

```bash
cd cinesage
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Configure a URL da API

 Crie um arquivo .env na raiz do projeto com a URL onde a API será hospedada localmente (ex: http://localhost:3001):

```env
API_URL=http://localhost:3001
```

### 5. Inicie o projeto

```bash
npm run dev
```
A aplicação será iniciada em http://localhost:5173.

## ✅ Funcionalidades previstas

- 🎯 Recomendação de filmes com base em preferências
- 🔍 Busca por nome de filme
- 📄 Página com detalhes do filme
- 📱 Responsividade

## ⚙️ Tecnologias

- **React**
- **React Router Dom**
- **Axios**
- **dotenv**