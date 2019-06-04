const mongoose = require('mongoose');

//Criando o Schema Cliente
const ClienteSchema = mongoose.Schema({
    nome: {
        type: String,
        minlength: [2, 'O nome é muito curto'],
        maxlength: [100, 'O nome é muito longo'],
        required: [true, 'O nome do cliente é obrigatório']
    },
    tipo: {
        type: String,
        enum: ['Física', 'Jurídica'],
        default: 'Física'
    },
    documento: {
        type: String,
        unique: true, //Criamos um índice único
        minlength: [14, 'O documento deve conter no mínimo 14 caracteres'], //cpf
        maxlength: [18, 'O documento deve conter no máximo 18 caracteres'],//cnpj
        validate: {
            validator: function (documento) { //Utilizaremos Regex para validar
                return /^([0-9]{3}[.][0-9]{3}[.][0-9]{3}[-][0-9]{2}|[0-9]{2}[.][0-9]{3}[.][0-9]{3}[/][0-9]{4}[-][0-9]{2})$/.test(documento);
            },
            message: props => props.value + ' não é um documento válido!'
        }
    },
    endereco: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        validate: {
            validator: function (email) { //Utilizei a Regex do site https://emailregex.com/  99,99% de garantia :)
                return /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(email);
            },
            message: props => props.value + ' não é um email válido!'
        }
    },
    nascimento: Date
}, {
        timestamps: true
    });
/*
Definindo um índice para o texto
Aqui você pode definir quantos campos desejar, porém é permitido criar apenas um índice por coleção. 
Maiores informações: https://docs.mongodb.com/manual/reference/operator/query/text/index.html
*/
ClienteSchema.index({
    nome: 'text',
    email: 'text',
}, {
        weights: {
            nome: 5, //Definimos o peso, ou seja, é MUIIITO mais importante encontrar algo no nome do que no email.
            email: 1,
        },
    });

module.exports = mongoose.model('Clientes', ClienteSchema);


