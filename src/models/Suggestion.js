const { Schema, model } = require('mongoose');


const SuggestionSchema = new Schema({
    name: {
        type: String,
        require: true,
    },

    count: {
        type: Number,
        default: 0,
    },
});

const Suggestion = model('Suggestion', SuggestionSchema);
module.export = Suggestion;