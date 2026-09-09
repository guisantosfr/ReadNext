# 📚 ReadNext

> **Sua próxima grande leitura a um clique de distância.**
> O **ReadNext** é uma aplicação web moderna e inteligente para gerenciamento de biblioteca pessoal e recomendação de livros baseada em Inteligência Artificial.

---

## 📸 Demonstração da Aplicação

*(Adicione aqui as capturas de tela da aplicação)*

| **Página Inicial / Busca** | **Minha Biblioteca** |
| :---: | :---: |
| ![Busca de Livros](docs/screenshots/dashboard.png) <br> *Busca integrada com a Google Books API* | ![Minha Biblioteca](docs/screenshots/library.png) <br> *Gerenciamento de status e acervo pessoal* |

| **Recomendações com IA** | **Exportação para Excel** |
| :---: | :---: |
| ![Recomendações IA](docs/screenshots/recommendations.png) <br> *Sugestões personalizadas geradas por IA* | ![Exportação Excel](docs/screenshots/export.png) <br> *Exportação rápida de acervo para .xlsx* |

---

## ✨ Funcionalidades Principais

- 🔍 **Busca Inteligente de Livros**: Integração direta com a **Google Books API** para consultar títulos, autores, capas, sinopse e metadados em tempo real.
- 📚 **Gerenciamento de Biblioteca Pessoal**: Organize seus livros por status de leitura (`LENDO`, `LIDO`, `QUERO_LER`, `DESISTI`, `RECOMENDADO`) e acompanhe sua evolução.
- 🤖 **Motor de Recomendações por IA**: Sugestões inteligentes personalizadas via **Spring AI** e **OpenAI (GPT)** com base em seus gostos, temas desejados e histórico de leitura.
- 📊 **Exportação de Acervo para Excel**: Exporte sua lista de livros e recomendações salvas para formato `.xlsx` estruturado utilizando Apache POI.
- 🎨 **Interface Moderna & Responsiva**: Desenvolvida com Next.js 15, Tailwind CSS v4, suporte a modo escuro e componentes refinados para máxima experiência do usuário.

---

## 🛠️ Tecnologias Utilizadas

### **Frontend**
- **Framework**: [Next.js 15](https://nextjs.org/) (App Router & React 19)
- **Linguagem**: [TypeScript](https://www.typescriptlang.org/)
- **Estilização**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Componentes & Ícones**: [Radix UI](https://www.radix-ui.com/), [Lucide React](https://lucide.dev/)
- **Notificações**: [Sonner](https://sonner.emilkowal.si/)

### **Backend**
- **Framework**: [Spring Boot 3](https://spring.io/projects/spring-boot) (Java 21/25)
- **Inteligência Artificial**: [Spring AI](https://spring.io/projects/spring-ai) (OpenAI Integration)
- **Persistência de Dados**: Spring Data JPA & [PostgreSQL](https://www.postgresql.org/)
- **Migrações de Banco**: [Flyway](https://flywaydb.org/)
- **Manipulação de Planilhas**: [Apache POI](https://poi.apache.org/)
- **Utilitários**: Lombok

---

## 📁 Estrutura do Repositório

```text
ReadNext/
├── backend/                  # API REST em Spring Boot
│   ├── src/
│   │   ├── main/java/com/guisantosfr/readnext/
│   │   │   ├── client/       # Clientes HTTP (Google Books API)
│   │   │   ├── config/       # Configurações do Spring (CORS, AI, etc.)
│   │   │   ├── controller/   # Rest Controllers (Endpoints)
│   │   │   ├── dto/          # Objetos de Transferência de Dados
│   │   │   ├── model/        # Entidades JPA e Enums
│   │   │   ├── repository/   # Interfaces Spring Data JPA
│   │   │   └── service/      # Regras de Negócio e Integração AI
│   │   └── resources/        # Application properties e migrations Flyway
│   ├── env.example           # Modelo de variáveis de ambiente do backend
│   └── pom.xml               # Dependências do Maven
│
└── frontend/                 # Aplicação Web em Next.js
    ├── src/
    │   ├── app/              # Páginas e Rotas (App Router)
    │   ├── components/       # Componentes React reutilizáveis
    │   ├── lib/              # Funções utilitárias e cliente API
    │   └── types/            # Definições de tipos TypeScript
    ├── env.example           # Modelo de variáveis de ambiente do frontend
    └── package.json          # Dependências do Node.js
```

---

## 🚀 Como Executar o Projeto

### 📋 Pré-requisitos
Antes de começar, você precisará ter instalado em sua máquina:
- [JDK 21 ou superior](https://www.oracle.com/java/technologies/downloads/)
- [Node.js 18+ e npm](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/) (ou instância rodando em container Docker)
- Chave de API da **OpenAI** (para funcionalidades de IA)

---

### 1️⃣ Configuração do Backend (Spring Boot)

1. Navegue até o diretório do backend:
   ```bash
   cd backend
   ```

2. Crie o arquivo `.env` baseado no `env.example`:
   ```bash
   cp env.example .env
   ```

3. Preencha as variáveis no arquivo `.env`:
   ```env
   DB_URL=jdbc:postgresql://localhost:5432/readnext
   DB_USER=seu_usuario
   DB_PASSWORD=sua_senha
   GOOGLE_BOOKS_API_KEY=sua_chave_google_books (opcional)
   OPENAI_API_KEY=sk-proj-sua-chave-openai
   ```

4. Execute a aplicação backend:
   ```bash
   ./mvnw spring-boot:run
   ```
   *O backend estará rodando em `http://localhost:8080`.*

---

### 2️⃣ Configuração do Frontend (Next.js)

1. Navegue até o diretório do frontend:
   ```bash
   cd frontend
   ```

2. Crie o arquivo `.env` baseado no `env.example`:
   ```bash
   cp env.example .env
   ```

3. Preencha a variável com o endereço da API backend:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8080
   ```

4. Instale as dependências e inicie o servidor de desenvolvimento:
   ```bash
   npm install
   npm run dev
   ```
   *O frontend estará disponível em `http://localhost:3000`.*

---

## 🔌 Principais Endpoints da API REST

| Método | Rota | Descrição |
| :--- | :--- | :--- |
| `GET` | `/books` | Lista todos os livros cadastrados na biblioteca |
| `POST` | `/books` | Cadastra um novo livro na biblioteca |
| `DELETE` | `/books/{id}` | Remove um livro da biblioteca pelo ID |
| `PATCH` | `/books/{id}/status` | Atualiza o status de leitura de um livro |
| `GET` | `/google-books/search` | Pesquisa livros na Google Books API (`?q=termo`) |
| `POST` | `/recommendations` | Gera sugestões de livros com IA a partir de preferências |
| `GET` | `/recommendations` | Obtém recomendações salvas |
| `GET` | `/export/excel` | Faz download da biblioteca em formato Excel (`.xlsx`) |

---

## 🤝 Contribuição

Contribuições são super bem-vindas! Se você deseja melhorar a aplicação:

1. Faça um **Fork** do repositório
2. Crie uma **Branch** para a sua funcionalidade (`git checkout -b feature/nova-funcionalidade`)
3. Faça **Commit** das suas alterações (`git commit -m 'Adiciona nova funcionalidade'`)
4. Faça o **Push** para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um **Pull Request**

---

## 📄 Licença

Este projeto é distribuído sob a licença MIT. Consulte o arquivo `LICENSE` para mais detalhes.

---

<p center="true">
  Desenvolvido por <strong>Guilherme Santos</strong> 🚀
</p>
