const mongoose = require("mongoose");

const contratoSchema = new mongoose.Schema({
  idcontrato: {
    type: String,
    required: true
  },
  nAnuncio: { type: String },
  tipoprocedimento: { type: String },
  objectoContrato: { type: String },
  dataPublicacao: { type: Date },
  dataCelebracaoContrato: { type: Date },
  precoContratual: { type: Number },
  prazoExecucao: { type: Number },
  NIPC_entidade_comunicante: { type: String },
  entidade_comunicante: { type: String },
  fundamentacao: { type: String }
});

module.exports = mongoose.model('Contrato', contratoSchema);
