//Obtendo o model do Produto
const Produto = require('../models/produto.model.js');

//Criando um novo produto
exports.create = (req, res) => {
    // Validando se veio algo junto a requisição
    if(!req.body) {
        
        return res.status(400).send({
            message: "Conteúdo para criar o produto não pode estar vazio!"
        });
    }

    // Criando o produto com os dados da requisição
    const produto = new Produto(req.body);

    // Salva o novo produto no MongoDB
    produto.save()
    .then(data => {
        res.send(data);
    }).catch(err => {        
        if(err.message.indexOf('duplicate key error') !== -1){
            res.status(500).send({
                message: "O documento informado já existe na base de dados." ||  err.message 
            });
        } else
        res.status(500).send({
            message: err.message || "Ocorreu algo errado ao salvar o novo produto."
        });
    });
};

// Obtendo todos os produtos do banco de dados
exports.findAll = (req, res) => {
    Produto.find()
    .sort({nome:1}) //para trazer em ordem descendente, passe -1    
    .then(produtos => {
        res.send(produtos);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Ocorreu algo errado ao obter os produtos do Banco de Dados."
        });
    });
};

// Obtendo todos os produtos a partir do nome, descrição ou código de barra
exports.findByTexto = (req, res) => {
    const termo = req.params.produtoTexto
    Produto.find({
        $text: { $search: termo }, //iremos obter o termo a ser pesquisado e aplicá-lo em nosso índice.
      })
    .sort({nome:1}) //para trazer em ordem descendente, passe -1    
    .then(produtos => {
        res.send(produtos);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Ocorreu algo errado ao obter os produtos do Banco de Dados."
        });
    });
};



// Localizar um único produto a partir do ID
exports.findOne = (req, res) => {
    Produto.findById(req.params.produtoId)
    .then(produto => {
        if(!produto) {
            return res.status(404).send({
                message: "Produto não encontrado com o ID " + req.params.produtoId
            });            
        }
        res.send(produto);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Produto não encontrado com o ID " + req.params.produtoId
            });                
        }
        return res.status(500).send({
            message: "Aconteceu algo errado ao obter o Produto com o id " + req.params.produtoId
        });
    });
};

// Alterando um produto
exports.update = (req, res) => {
       // Validando se veio algo junto a requisição
    if(!req.body) {
        return res.status(400).send({
            message: "Conteúdo para alterar o produto não pode estar vazio"
        });
    }

    // Localiza e alteramos os dados do produto a partir do conteúdo da requisição
    Produto.findByIdAndUpdate(req.params.produtoId, 
        {
            nome:  req.body.nome,
            cpf: req.body.cpf,
            endereco: req.body.endereco,
            email: req.body.email,
            nascimento: req.body.nascimento       
        }, {new: true}) //iremos trazer o resultado do novo registro alterado
    .then(produto => {
        if(!produto) {
            return res.status(404).send({
                message: "Produto não encontrado com o Id " + req.params.produtoId
            });
        }
        res.send(produto);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Produto não encontrado com o Id " + req.params.produtoId
            });                
        }
        return res.status(500).send({
            message: "Aconteceu algo errado ao tentar alterar o produto com o Id " + req.params.produtoId
        });
    });
};

// Apaga um determinado produto a partir do ID passado
exports.delete = (req, res) => {
    Produto.findByIdAndRemove(req.params.produtoId)
    .then(produto => {
        if(!produto) {
            return res.status(404).send({
                message: "Produto não encontrado com o Id " + req.params.produtoId
            });
        }
        res.send({message: "Produto removido com sucesso!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Produto não encontrado com o Id " + req.params.produtoId
            });                
        }
        return res.status(500).send({
            message: "Não foi possível apagar o produto com o Id " + req.params.produtoId
        });
    });
};