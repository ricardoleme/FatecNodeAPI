const mongoose = require('mongoose');

//Criando o Schema Grupo
const GrupoSchema = mongoose.Schema({
    nome: {
        type: String,
        minlength: [2, 'O nome é muito curto'],
        maxlength: [100, 'O nome é muito longo'],
        required: [true, 'O nome do grupo é obrigatório'],
        unique: true, //Criamos um índice único
    },
    status: {
        type: String,
        enum: ['ativo','inativo'],
        default: 'ativo'        
    }
}, {
        timestamps: true
    });


module.exports = mongoose.model('Grupos', GrupoSchema);


