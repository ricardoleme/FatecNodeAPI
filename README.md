# FatecNodeAPI
> Exemplo de API REST criada em Node.Js, Express, BodyParser e Mongoose

[![NPM Version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Downloads Stats][npm-downloads]][npm-url]

Projeto utilizado nas aulas de Programação para a Internet na FATEC Itu. (Faculdade de Tecnologia Dom Amaury Castanho).
A Fatec Itu é uma faculdade pública e gratuita do Centro Paula Souza, órgão pertencente ao Governo do Estado de São Paulo.

O projeto está todo em português, com o objetivo de facilitar o primeiro contato com a tecnologia. :satisfied:

![](../header.png)

## Instalação
É necessário ter o Node.js e o NPM instalados em seu ambiente.
Aí basta, carregar todas as dependências através do npm:
```sh
npm i
```

### Dica para facilitar o recarregamento automático 
Se possível, instale o Nodemon: Ele ficará monitorando as alterações nos arquivos e reiniciará automaticamente os scripts

```sh
npm i -g nodemon
```

## Exemplo de uso

Defina no arquivo config.js as seguintes configurações iniciais:

```sh
    urlMongodbLocal: 'mongodb://localhost:27017/projetoMongo',
    urlMongodbRemoto: 'mongodb+srv://usuario:senha@suaStringConexão',
    portaServidor: 3001 ,
    nomeAPI: 'Projeto REST Exemplo - Fatec Itu',
    versaoAPI: '1.0.0'
```

Acesse o Modelo na pasta _models_
Visualize os Controladores na pasta _controllers_
Consulte todas as rotas na pasta _routes_

Aí carregue no terminal o script:

```sh
nodemon server.js
```

_Para mais especificações, consulte a documentação dentro do próprio código fonte.

## Como testar a API

Utilize o POSTMAN ou ferramenta similar para fazer as chamadas, conforme exemplo:

| Método  | URL | Ação |
| ------------- | ------------- |------------- |
| GET  | http://localhost:3001/produtos  | Retorna todos os produtos |
| GET  | http://localhost:3001/produtos/5cf6bc592aed233868ef9809  | Retorna os dados do produto com o ID passado |
| POST  | http://localhost:3001/produtos/  | Salva os dados do produto a partir do JSON enviado na requisição |
| PUT  | http://localhost:3001/produtos/  | Altera os dados do produto a partir do JSON enviado na requisição |
| DELETE  | http://localhost:3001/produtos/5cf6bc592aed233868ef9809   | Remove os dados do produto a partir do ID passado |


Ou se preferir, instale a extensão *REST Client* no Visual Studio Code e abra o arquivo correspondente a cada _controller_ na pasta http, clicando
no item _Send Request_.
![](/public/img/exemplo_rest.gif)

## Histórico de lançamentos

* 0.0.1
    * Projeto inicial
    * Adicionado exemplo de Model, Controller e Routes com Clientes e Produtos

## Meta

Prof. Ricardo Leme – [@ricardoleme](https://twitter.com/ricardorleme) – ricardo.leme@fatec.sp.gov.br

Distribuído sob a licença [MIT](https://opensource.org/licenses/MIT).

[https://github.com/ricardoleme/FatecNodeAPI](https://github.com/ricardoleme/FatecNodeAPI)

## Contributing

1. Faça o _fork_ do projeto (<https://github.com/yourname/yourproject/fork>)
2. Crie uma _branch_ para sua modificação (`git checkout -b feature/fooBar`)
3. Faça o _commit_ (`git commit -am 'Add some fooBar'`)
4. _Push_ (`git push origin feature/fooBar`)
5. Crie um novo _Pull Request_

[npm-image]: https://img.shields.io/npm/v/datadog-metrics.svg?style=flat-square
[npm-url]: https://npmjs.org/package/datadog-metrics
[npm-downloads]: https://img.shields.io/npm/dm/datadog-metrics.svg?style=flat-square
[travis-image]: https://img.shields.io/travis/dbader/node-datadog-metrics/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/dbader/node-datadog-metrics
[Fatec]: http://fatecitu.edu.br/resources/site2/fatec_logo.png 

