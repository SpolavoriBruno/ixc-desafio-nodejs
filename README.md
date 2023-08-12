# Desafio Node.js - Socket.io Chat


Este projeto foi desenvolvido como um desafio técnico Node.js

Ambos os projetos foram desenvolvidos em javascript devido ao tempo hábil para  execução do desafio. O Commit inicial foi enviado em 48 horas.


## Executando o Projeto

### Docker compose
Para iniciar as aplicações basta clonar o repositorio e executar o docker compose estando na raiz do projeto:

```
docker compose up -d
```

Por padrão a aplicação está exposta no endereço `localhost:3000` e a API no endereço `localhost:4000` 

Este comando executa três instâncias: 
 - MongoDB, usado para persistência da API
 - API, contruida em tempo de execução
 - Chat, construido em tempode execução e servido com Nginx

#### Comandos Auxiliares 
```
# Acompanhar logs da api
docker compose logs -f api

# Acompanhar logs do Webserver
docker compose logs -f chat

# Parar todas aplicações
docker compose down
```

* Para executar sem Docker siga as instruções contidas em cada repositório. *

### Variáveis de ambiente

| Variável | Descrição | Padrão|
| -------- | ---------- | ------- |
| PORT | Porta na qual a API escuta as requisições | 4000 |
| MONGO_URL | Caminho para conexão com Mongo ou Atlas | mongodb://user:pass@mongodb:27017/ixc?authSource=admin|
| SECRET | Segredo para encriptar os coockies | aVeryStrongSecret |


## Problemas conhecidos
- Durante os testes a aplicação não recebeu as mensagens usando o Google Chrome, mas funcionou normalmente no Firefox.
- Conexão com o servidor Socket.io pode ser acessada sem autenticação.
