const mongoose = require('mongoose');

//Criando o Schema Produto
const ProdutoSchema = mongoose.Schema({
    nome: {
        type: String,
        minlength: [2, 'O nome é muito curto'],
        maxlength: [100, 'O nome é muito longo'],
        required: [true, 'O nome do produto é obrigatório']
    },
    descricao: {
        type: String,
        maxlength: [1000, 'A descrição é muito longa'],
        required: false
    },
    codigobarra: {
        type: String,
        unique: true, //Criamos um índice único
        minlength: [13,'O código de barras deve conter no mínimo 13 caracteres'], //sem ponto
        maxlength: [15, 'O código de barras deve conter no máximo 15 caracteres'],//com ponto
        validate: {
            validator: function(cbarra) { //Utilizaremos Regex para validar
              return /^([0-9]{1}[.]?[0-9]{6}[.]?[0-9]{6})$/.test(cbarra);
            },
            message: props => props.value +' não é um código de barras válido!'
    }    
},
    preco: Number
}, {
        timestamps: true
    });
/*
Definindo um índice para o texto
Aqui você pode definir quantos campos desejar, porém é permitido criar apenas um índice por coleção. 
Maiores informações: https://docs.mongodb.com/manual/reference/operator/query/text/index.html
*/
ProdutoSchema.index({
    nome: 'text',
    descricao: 'text',
    codigobarra: 'text'
}, {
        weights: {
            nome: 5, //Definimos o peso, ou seja, é MUIIITO mais importante encontrar algo no nome do que na descricao
            descricao: 3,
            codigobarra: 1,
        },
    });

module.exports = mongoose.model('Produtos', ProdutoSchema);


