# node-refresh-token
Implement Refresh Token Authentication Using Node and JWT
Implementando Refresh Token Autenticação usando Node e JWT

Clone the repository and switch to the project directory.

Install dependencies using ```npm install``` command then run the code using following command.
instale as dependencias usando npn install

```node app.js```

roda a aplicação com o comando = node app.js
aconselho usar o plugin nodemon procure ler sobre 

Give following API calls to check the working.

```/login```

pra testar usa algum aplicação tipo postman para fazer um post passando os atributos
conforme abaixo 
para /login

post data => 

```
{
	"email": "shahid@codeforgeek.com",
	"name": "Shahid"
}
```

```/secure```

in headers provide,

```x-access-header=access token from the previous API```
