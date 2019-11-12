const mongoose = require('mongoose');

const folderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    folder_name: String

});

 module.exports = mongoose.model('folder', folderSchema);