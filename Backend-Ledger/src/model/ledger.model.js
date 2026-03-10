const mongoose = require('mongoose')

const ledgerSchema = new mongoose.Schema({

    account:{
      type: mongoose.Schema.Types.ObjectId,
      ref:'account',
      index: true,
      immutable: true,
      required: [true, 'Ledger must be associated with an account']
    },
    amount:{
        type: Number,
        required: [true,"Amount is required for creating a ledger entry"],
        immutable: true
    },
    transaction: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'transaction',
        required: [true, "Ledger must be associated with a transaction"],
        index: true,
        immutable: true

    },
    type:{
        type: String,
        enum: {
            values: ['credit','debit'],
            message: 'Type can be either credit or debit'
        },
        required: [true,'Ledger type is required'],
        immutable: true

    }
})

function preventLedgerModification(){
    throw new Error("Ledger entries are immutable and connot be modified or deleted")
}

ledgerSchema.pre('findOne',preventLedgerModification);
ledgerSchema.pre('updateMany',preventLedgerModification);
ledgerSchema.pre('deleteMany',preventLedgerModification)
ledgerSchema.pre('remove',preventLedgerModification)
ledgerSchema.pre('findOneAndUpdate',preventLedgerModification)

const ledgerModel = mongoose.model('ledger', ledgerSchema);
module.exports = ledgerModel