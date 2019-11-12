const mongoose = require('mongoose');


const imageSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    image_url:String,
    folder_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'folder',
        required: true
    }
});

module.exports = mongoose.model('image', imageSchema);