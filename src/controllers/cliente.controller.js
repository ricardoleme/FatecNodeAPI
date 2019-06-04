//Obtendo o model do Cliente
const Cliente = require('../models/cliente.model.js');

//Criando um novo cliente
exports.create = (req, res) => {
    // Validando se veio algo junto a requisição
    if(!req.body) {
        
        return res.status(400).send({
            message: "Conteúdo para criar o cliente não pode estar vazio!"
        });
    }

    // Criando o cliente com os dados da requisição
    const cliente = new Cliente(req.body);

    // Salva o novo cliente no MongoDB
    cliente.save()
    .then(data => {
        res.send(data);
    }).catch(err => {        
        if(err.message.indexOf('duplicate key error') !== -1){
            res.status(500).send({
                message: "O documento informado já existe na base de dados." ||  err.message 
            });
        } else
        res.status(500).send({
            message: err.message || "Ocorreu algo errado ao salvar o novo cliente."
        });
    });
};

// Obtendo todos os clientes do banco de dados
exports.findAll = (req, res) => {
    Cliente.find()
    .sort({nome:1}) //para trazer em ordem descendente, passe -1    
    .then(clientes => {
        res.send(clientes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Ocorreu algo errado ao obter os clientes do Banco de Dados."
        });
    });
};

// Obtendo todos os clientes a partir do nome ou email
exports.findByTexto = (req, res) => {
    const termo = req.params.clienteTexto
    Cliente.find({
        $text: { $search: termo }, //iremos obter o termo a ser pesquisado e aplicá-lo em nosso índice.
      })
    .sort({nome:1}) //para trazer em ordem descendente, passe -1    
    .then(clientes => {
        res.send(clientes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Ocorreu algo errado ao obter os clientes do Banco de Dados."
        });
    });
};



// Localizar um único cliente a partir do ID
exports.findOne = (req, res) => {
    Cliente.findById(req.params.clienteId)
    .then(cliente => {
        if(!cliente) {
            return res.status(404).send({
                message: "Cliente não encontrado com o ID " + req.params.clienteId
            });            
        }
        res.send(cliente);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Cliente não encontrado com o ID " + req.params.clienteId
            });                
        }
        return res.status(500).send({
            message: "Aconteceu algo errado ao obter o Cliente com o id " + req.params.clienteId
        });
    });
};

// Alterando um cliente
exports.update = (req, res) => {
       // Validando se veio algo junto a requisição
    if(!req.body) {
        return res.status(400).send({
            message: "Conteúdo para alterar o cliente não pode estar vazio"
        });
    }

    // Localiza e alteramos os dados do cliente a partir do conteúdo da requisição
    Cliente.findByIdAndUpdate(req.params.clienteId, 
        {
            nome:  req.body.nome,
            cpf: req.body.cpf,
            endereco: req.body.endereco,
            email: req.body.email,
            nascimento: req.body.nascimento       
        }, {new: true}) //iremos trazer o resultado do novo registro alterado
    .then(cliente => {
        if(!cliente) {
            return res.status(404).send({
                message: "Cliente não encontrado com o Id " + req.params.clienteId
            });
        }
        res.send(cliente);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Cliente não encontrado com o Id " + req.params.clienteId
            });                
        }
        return res.status(500).send({
            message: "Aconteceu algo errado ao tentar alterar o cliente com o Id " + req.params.clienteId
        });
    });
};

// Apaga um determinado cliente a partir do ID passado
exports.delete = (req, res) => {
    Cliente.findByIdAndRemove(req.params.clienteId)
    .then(cliente => {
        if(!cliente) {
            return res.status(404).send({
                message: "Cliente não encontrado com o Id " + req.params.clienteId
            });
        }
        res.send({message: "Cliente removido com sucesso!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Cliente não encontrado com o Id " + req.params.clienteId
            });                
        }
        return res.status(500).send({
            message: "Não foi possível apagar o cliente com o Id " + req.params.clienteId
        });
    });
};