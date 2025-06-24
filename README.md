# Front-Bastet

## 📋 Sobre
Front-Bastet é uma aplicação web desenvolvida com Next.js 14, React e TypeScript, utilizando Tailwind CSS para estilização. Este projeto funciona em conjunto com a [API de Gerenciamento de Cursos](https://github.com/Galvictor/cursos-infnet-api), formando um sistema completo de gerenciamento de cursos e matrículas.

## 🚀 Funcionalidades
- Sistema de autenticação (login/cadastro) integrado com JWT
- Gerenciamento de usuários
- Visualização e gerenciamento de cursos
- Sistema de matrículas
- Interface responsiva e moderna
- Integração completa com backend REST API

## 🛠️ Tecnologias Utilizadas
- Next.js 14.2.3
- React
- TypeScript
- Tailwind CSS 3.4.1
- ESLint
- Integração com API REST

## 📁 Estrutura do Projeto
```
src/
├── app/                    # Páginas da aplicação
│   ├── cadastro/          # Página de cadastro
│   ├── login/             # Página de login
│   └── usuario/           # Páginas de usuário
├── components/            # Componentes reutilizáveis
├── config/               # Configurações da aplicação
├── context/              # Contextos React
├── lib/                  # Funções utilitárias
└── services/            # Serviços e integrações com API
```

## 🔗 Pré-requisitos
- Node.js
- npm
- [API de Gerenciamento de Cursos](https://github.com/Galvictor/cursos-infnet-api) em execução

## 🚀 Como Executar

1. **Clone o repositório**
```bash
git clone [url-do-repositorio]
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure a conexão com o backend**
   Certifique-se de que a API está rodando e configure o arquivo de ambiente adequadamente.

4. **Execute a aplicação**
```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`

## 🔄 Integração com Backend
Este frontend se integra com a [API de Gerenciamento de Cursos](https://github.com/Galvictor/cursos-infnet-api), que oferece:
- Autenticação via JWT
- Gerenciamento de cursos
- Sistema de matrículas
- Gerenciamento de usuários
- Banco de dados MySQL

Para um funcionamento completo do sistema, certifique-se de que o backend está configurado e em execução.

## 🤝 Contribuição
Contribuições são sempre bem-vindas! Por favor, leia as diretrizes de contribuição antes de submeter pull requests.

## 📄 Licença
Este projeto está sob a licença incluída no arquivo LICENSE.