//Obtendo o model do Grupo
const Grupo = require('../models/grupo.model.js');

//Criando um novo grupo
exports.incluir = (req, res) => {   
    // Criando o grupo com os dados da requisição
    const grupo = new Grupo(req.body);

    // Salva o novo grupo no MongoDB
    grupo.save()
    .then(data => {
        res.send(data);
    }).catch(err => {        
        if(err.message.indexOf('duplicate key error') !== -1){
            res.status(500).send({
                message: "O registro informado já existe na base de dados. " &&  err.message 
            });
        } else
        res.status(500).send({
            message: err.message || "Ocorreu algo errado ao salvar o novo grupo."
        });
    });
};

// Obtendo todos os grupos do banco de dados
exports.listarTodos = (req, res) => {
    Grupo.find({status:"ativo"}) //exibiremos apenas os grupos com o status=ativo
    .sort({nome:1}) //para trazer em ordem descendente, passe -1    
    .then(grupos => {
        res.send(grupos);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Ocorreu algo errado ao obter os grupos do Banco de Dados."
        });
    });
};



// Localizar um único grupo a partir do ID
exports.listarPeloId = (req, res) => {
    Grupo.findById(req.params.grupoId)
    .then(grupo => {
        if(!grupo) {
            return res.status(404).send({
                message: "Grupo não encontrado com o ID " + req.params.grupoId
            });            
        }
        res.send(grupo);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Grupo não encontrado com o ID " + req.params.grupoId
            });                
        }
        return res.status(500).send({
            message: "Aconteceu algo errado ao obter o Grupo com o id " + req.params.grupoId
        });
    });
};

// Alterando um grupo
exports.alterar = (req, res) => {   
    // Localiza e alteramos os dados do grupo a partir do conteúdo da requisição       
    Grupo.findByIdAndUpdate(req.params.grupoId, 
        req.body) 
    .then(grupo => {
        if(!grupo) {
            return res.status(404).send({
                message: "Grupo não encontrado com o Id " + req.params.grupoId
            });
        }
        res.send(grupo);
    }).catch(err => {        
        return res.status(500).send({
            message: "Não foi possível alterar o grupo com o Id " + req.params.grupoId + " - " +err.message
        });
    });
};

// Apaga um determinado grupo a partir do ID passado
exports.apagar = (req, res) => {
    Grupo.findByIdAndRemove(req.params.grupoId)
    .then(grupo => {
        if(!grupo) {
            return res.status(404).send({
                message: "Grupo não encontrado com o Id " + req.params.grupoId
            });
        }       
        res.send({message: "Grupo removido com sucesso!"});
    }).catch(err => {       
        return res.status(500).send({
            message: "Não foi possível apagar o grupo com o Id " + req.params.grupoId + " - " +err.message
        });
    });
};