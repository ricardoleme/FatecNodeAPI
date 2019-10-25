/* 
    Obtendo as dependências:
    config     Arquivo de configurações do nosso app
    express    Framework web rápido, flexível e minimalista para Node.js
    bodyParser Módulo capaz de converter o body da requisição para vários formatos, entre eles o JSON
    mongoose   Módulo para conexão ao MongoDB
*/
const config = require('./config.js');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// Definindo como iremos dar o parse em nossas requisições (requests)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Habilitando CORS para todos os métodos HTTP
//Para saber mais: https://pt.wikipedia.org/wiki/Cross-origin_resource_sharing
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


//mongoose.Promise = global.Promise;

//Atribuindo as configurações do MongoDB
function setRunValidators() {
    this.setOptions({ runValidators: true, new: true });
    // runValidators: efetuar as validações no update    
    // new: iremos trazer o resultado do novo registro alterado
}
mongoose.plugin(schema => {
schema.pre('findOneAndUpdate', setRunValidators);
schema.pre('updateMany', setRunValidators);
schema.pre('updateOne', setRunValidators);
schema.pre('update', setRunValidators);
})
// Conectando ao MongoDB
mongoose.connect(config.urlMongodbLocal, {
    //Configurações para evitar os erros de deprecated functions (funções descontinuadas)
    //Para saber mais: https://mongoosejs.com/docs/deprecations.html
    useNewUrlParser: true, //Atribuímos para utilizar o novo Parser de URL
    useCreateIndex: true, //Como a função ensureIndex() está descontinuada, iremos forçar para ele utilizar o CreateIndex.
    useFindAndModify: false, //Definimos como false para fazer com que o Mongoose utilize os métodos findOneAndUpdate() e findOneAndRemove() por padrão
    useUnifiedTopology: true // Para utilizarmos a nova engine para Descoberta e Monitoramento de Servidores
}).then(() => {
    console.log("Conexão efetuada com sucesso ao MongoDB! :)");
}).catch(err => {
    console.log('Não foi possível estabelecer a conexão ao MongoDb :( Saindo...', err);
    process.exit();
});

// rota default /
app.get('/', (req, res) => {
    res.json({ "message": "Seja bem vindo a API " + config.nomeAPI + " versão " + config.versaoAPI });
});
// obtendo as demais rotas
require('./src/routes/produto.routes.js')(app);
require('./src/routes/grupo.routes.js')(app);

if (require.main === module) { // Verifica se foi executado diretamente via linha de comando. Ex: node server.js
    // Ouvindo na porta especificada
    app.listen(config.portaServidor, () => {
        console.log('Servidor Web está ouvindo na porta ' + config.portaServidor);
    });
}