# 💰 PG Money  

<p align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="React Logo" width="80"/>
</p>

PG Money é um sistema de **controle financeiro** que permite gerenciar **entradas**, **saídas** e o **saldo total** de forma prática e intuitiva.

A aplicação permite:  
✅ Adicionar transações financeiras (entrada ou saída)  
✅ Exibir descrição, valor, categoria e data da transação  
✅ Filtrar transações por tipo  
✅ Exibir o saldo total atualizado  

---

## 🌍 Acesse Online  

🔗 **Deploy:** [PG Money - Vercel](https://pg-money.vercel.app)  

---

## 🚀 Tecnologias Principais  

| Tecnologia       | Versão       | Descrição |
|-----------------|-------------|-----------|
| **React**      | 19.0.0       | Biblioteca para construção da UI |
| **TypeScript** | 5.7.2           | Tipagem estática para segurança e escalabilidade |
| **Vite**       | 6.2.0           | Bundler e servidor de desenvolvimento rápido |
| **Styled Components** | 6.1.17    | Estilização CSS-in-JS |

---

## 📦 Dependências Principais  

- **@hookform/resolvers** → Validação de formulários  
- **@radix-ui** → Componentes de UI acessíveis  
- **react-dialog** → Modais interativos  
- **react-radio-group** → Seleção de opções  
- **phosphor-react** → Ícones personalizados  
- **react-hook-form** → Gerenciamento eficiente de formulários  
- **styled-components** → Estilização baseada em componentes  
- **use-context-selector** → Otimização do Context API  
- **zod** → Validação de dados  

---

## 🎯 Funcionalidades Implementadas  

### 📊 **Gerenciamento de Transações**  
✅ Armazenamento local usando `localStorage`  
✅ CRUD completo (Criar, Ler, Atualizar, Deletar)  
✅ Filtragem eficiente de transações  
✅ Formatação automática de valores monetários e datas  

### 🎨 **Interface do Usuário**  
✅ Tema escuro personalizado  
✅ Componentes acessíveis e reutilizáveis  
✅ Layout **100% responsivo**  
✅ Modais para criação de transações  
✅ Formulários validados e amigáveis  

### 🎨 **Estilização**  
✅ **Sistema de temas** com cores personalizadas  
✅ Estilos globais e organizados  
✅ **Componentes estilizados** com `styled-components`  
✅ Fonte **Roboto** do Google Fonts  

---

## 🏛 Arquitetura  

### 🌍 **Gerenciamento de Estado com Context API**  
🔹 **TransactionsContext**: Responsável por armazenar e gerenciar transações  
🔹 Implementa um **Provider** para compartilhamento eficiente de estado  

### 🏗 **Componentização**  
🔹 Código modular e reutilizável  
🔹 Separação clara de responsabilidades  
🔹 Componentes funcionais otimizados com **hooks**  

### 🎨 **Estilização Centralizada**  
🔹 Sistema de **temas globais**  
🔹 Variáveis de cores para consistência visual  
🔹 Reset de estilos e configuração base  

---

## 🛠 Funcionalidades Específicas  

### 🔢 **Formatação de Dados**  
✅ Moeda brasileira (**R$ BRL**)  
✅ Datas no padrão **pt-BR**  

### 💾 **Armazenamento**  
✅ Persistência local com **localStorage**  
✅ Chave única para armazenamento: `@pg-money:transactions`  
✅ Sincronização automática entre **estado** e **armazenamento**  

### 🛡 **Validação de Formulários**  
✅ Validação via **react-hook-form**  
✅ Validação de dados com **zod**  
✅ Feedback visual para erros  

---

## ✅ Boas Práticas Implementadas  

✔ **Tipagem forte** com TypeScript  
✔ **Componentização inteligente**  
✔ **Gerenciamento de estado eficiente**  
✔ **Acessibilidade e responsividade**  
✔ **Código limpo e organizado**  
✔ **Separação clara de responsabilidades**  

---

## 🔧 Configurações de Desenvolvimento  

🔹 **ESLint** para linting  
🔹 **TypeScript** configurado para React  
🔹 **Vite** para desenvolvimento rápido  
🔹 **Scripts npm** para diferentes tarefas  

---

## 🔒 Segurança e Performance  

✅ **Armazenamento local seguro**  
✅ **Otimização de re-renders** com `useCallback`  
✅ **Lazy loading implícito** com Vite  
✅ **Tipagem forte** para prevenir erros em runtime  

---

## ▶️ Como Executar o Projeto  

1. Clone o repositório:  
   ```sh
   git clone git@github.com:PedroGouveia77/pg-money.git
   cd pg-money

2. Instale as dependências:
   ```sh
   npm install

3. Execute o projeto:
   ```sh
   npm run dev

A aplicação estará disponível em http://localhost:5173 🚀


---

## 📝 Considerações Finais
Este projeto foi desenvolvido para facilitar o controle financeiro pessoal, aplicando as melhores práticas do React para garantir escalabilidade, performance e facilidade de uso.

Se tiver sugestões ou melhorias, sinta-se à vontade para contribuir! 🎉

🚀 Desenvolvido por Pedro Henrique Gouveia de Miranda Couto
- [GitHub](https://github.com/PedroGouveia77) | [LinkedIn](www.linkedin.com/in/pedrohenriquegouveia)

 Esse projeto foi feito durante o curso "HTTP e Performance" durante a formação de ReactJS da Rocketseat. Teve duração de 4 horas e foi concluido em 03/04/2025.
