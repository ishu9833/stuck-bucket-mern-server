const { Schema, model } = require('mongoose');


    const BucketSchema = new Schema({
        name: {
            type: String,
            require: true,
        },

        cost: {
            type: Number,
            default: 0,
        },
        items: {
            type: Schema.Types.ObjectId,
            ref: 'Item',
        },
    },
        { timestamps = true },
    );

const Bucket = model('Bucket', BucketSchema);


module.export = Bucket;