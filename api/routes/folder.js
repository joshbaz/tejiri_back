const express = require('express');
const router = express.Router();
const folderController = require('../controllers/folder');

router.post('/register', folderController.registerFolder);

router.get('/:folderId', folderController.getByFolderId);

router.get('/', folderController.getAllFolders);

module.exports = router