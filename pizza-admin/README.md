# Pizza Admin

Sistema de gestão para pizzaria desenvolvido como projeto fullstack da disciplina.

**Autor:** Pedro Mota Batista

---

## Sobre o projeto

Sistema web completo com frontend em HTML/CSS/JS e backend em Node.js (Express). Permite gerenciar clientes, produtos, pedidos e usuários com autenticação JWT.

## Como rodar

O projeto está hospedado no Replit e pode ser acessado pelo link do deploy.

Para rodar localmente, entre na pasta `backend`, instale as dependências com `npm install` e rode com `npm start`.

## Login padrão

- Email: admin@pizzaria.com  
- Senha: admin123

## Funcionalidades

- Cadastro e login de usuários com JWT
- CRUD de clientes com busca de endereço via ViaCEP e IBGE
- CRUD de produtos (pizzas, bebidas e sobremesas)
- CRUD de pedidos com cálculo de valor total
- Documentação dos endpoints via Swagger em `/api-docs`

## Tecnologias usadas

- Node.js + Express
- JWT para autenticação
- Axios no frontend
- ViaCEP e IBGE para endereços
- Swagger para documentação