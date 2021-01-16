const { Schema, model } = require('mongoose');


const ItemSchema = new Schema({
    name: {
        type: String,
        require: true,
    },

    cost: {
        type: Number,
        default: 0,
    },
    quantity: String,
    isComplete: {
        type: Boolean,
        default: false,
    },
});

const Item = model('Item', ItemSchema);


module.export = Item;