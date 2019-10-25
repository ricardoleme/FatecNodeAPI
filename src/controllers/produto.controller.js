//Obtendo o model do Produto
const Produto = require('../models/produto.model.js');

//Criando um novo produto
exports.incluir = (req, res) => {   
    // Criando o produto com os dados da requisição
    const produto = new Produto(req.body);

    // Salva o novo produto no MongoDB
    produto.save()
    .then(data => {
        res.send(data);
    }).catch(err => {        
        if(err.message.indexOf('duplicate key error') !== -1){
            res.status(500).send({
                message: "O registro informado já existe na base de dados. " &&  err.message 
            });
        } else
        res.status(500).send({
            message: err.message || "Ocorreu algo errado ao salvar o novo produto."
        });
    });
};

// Obtendo todos os produtos do banco de dados
exports.listarTodos = (req, res) => {
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
exports.listarPeloTexto = (req, res) => {
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
exports.listarPeloId = (req, res) => {
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
exports.alterar = (req, res) => {   
    // Localiza e alteramos os dados do produto a partir do conteúdo da requisição       
    Produto.findByIdAndUpdate(req.params.produtoId, 
        req.body) 
    .then(produto => {
        if(!produto) {
            return res.status(404).send({
                message: "Produto não encontrado com o Id " + req.params.produtoId
            });
        }
        res.send(produto);
    }).catch(err => {        
        return res.status(500).send({
            message: "Não foi possível alterar o produto com o Id " + req.params.produtoId + " - " +err.message
        });
    });
};

// Apaga um determinado produto a partir do ID passado
exports.apagar = (req, res) => {
    Produto.findByIdAndRemove(req.params.produtoId)
    .then(produto => {
        if(!produto) {
            return res.status(404).send({
                message: "Produto não encontrado com o Id " + req.params.produtoId
            });
        }       
        res.send({message: "Produto removido com sucesso!"});
    }).catch(err => {       
        return res.status(500).send({
            message: "Não foi possível apagar o produto com o Id " + req.params.produtoId + " - " +err.message
        });
    });
};