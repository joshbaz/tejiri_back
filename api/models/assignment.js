const mongoose= require('mongoose');

const assignmentSchema =  mongoose.Schema ({
    _id: mongoose.Schema.Types.ObjectId,
    folder_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'folder',
        required: true
    },
    user_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user',
        required: true
    }
});

module.exports = mongoose.model('assignment', assignmentSchema); 