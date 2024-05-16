const mongoose = require('mongoose');
const Contrato = require('../models/contratosModel'); // Importa o modelo Contrato

// Lista todos os registros
module.exports.list = () => {
    return Contrato.find().exec();
};

// Encontra um registro pelo ID
module.exports.findById = id => {
    return Contrato.findOne({ idcontrato: id }).exec();
};

// Encontra registros por entidade comunicante
module.exports.findByEntity = entity => {
    return Contrato.find({ entidade_comunicante: entity }).exec();
};

// Encontra registros por tipo de procedimento
module.exports.findByProcedureType = procedureType => {
    return Contrato.find({ tipoprocedimento: procedureType }).exec();
};

// Lista de entidades comunicantes ordenada alfabeticamente sem repetições
module.exports.listEntities = () => {
    return Contrato.distinct('entidade_comunicante').exec().then(entities => {
        return entities.sort();
    });
};

// Lista de tipos de procedimento ordenada alfabeticamente sem repetições
module.exports.listProcedureTypes = () => {
    return Contrato.distinct('tipoprocedimento').exec().then(types => {
        return types.sort();
    });
};

// Insere um novo registro
module.exports.insert = contrato => {
    return Contrato.findOne({ idcontrato: contrato.idcontrato }).exec()
        .then(result => {
            if (!result) {
                const newContrato = new Contrato(contrato);
                return newContrato.save();
            } else {
                throw new Error("Registro já existe");
            }
        });
};

// Atualiza um registro existente
module.exports.update = (id, contrato) => {
    return Contrato.findOneAndUpdate({ idcontrato: id }, contrato, { new: true }).exec();
};

// Exclui um registro
module.exports.delete = id => {
    return Contrato.findOneAndDelete({ idcontrato: id }).exec();
};