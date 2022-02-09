const SingleFile = require('../models/singlefile');
const MultipleFile = require('../models/multiplefiles');

// Upload single file
const singleFileUpload = async (req, res, next) => {
    try {
        const file = new SingleFile({
            title: req.body.title,
            isbnNnumber: req.body.isbnNnumber,
            description: req.body.description,
            condition: req.body.condition,
            price: req.body.price,
            numberOfItems: req.body.numberOfItems,
            location: req.body.location,
            paymentMethod: req.body.paymentMethod,
            fileName: req.file.originalname,
            filePath: req.file.path,
            fileType: req.file.mimetype,
            fileSize: fileSizeFormatter(req.file.size, 2)
        });
        await file.save();
        res.status(201).send('Your data and image has uploaded successfully');
    } catch(error) {
        res.status(400).send(error.message);
    }
}

// Multiple file upload
const multipleFileUpload = async (req, res, next) => {
    try {
        let filesArray = [];
        req.files.forEach(element => {
            const file = {
                fileName: element.originalname,
                filePath: element.path,
                fileType: element.mimetype,
                fileSize: fileSizeFormatter(element.size, 2)
            }

            filesArray.push(file);
        });
        const multipleFiles = new MultipleFile({
            title: req.body.title,
            isbnNnumber: req.body.isbnNnumber,
            description: req.body.description,
            condition: req.body.condition,
            price: req.body.price,
            numberOfItems: req.body.numberOfItems,
            location: req.body.location,
            paymentMethod: req.body.paymentMethod,
            files: filesArray
        });
        await multipleFiles.save();
        res.status(200).send('Your data and images has been uploaded successfully')
    } catch(error) {
        res.status(400).send(error.message);
    }
}

// Get all the single files
const getallSingleFiles = async (req, res, next) => {
    try {
        const files = await SingleFile.find();
        res.status(200).send(files)
    } catch(error) {
        res.status(400).send(error.message);
    }
}

// Get al the multiple files
const getallmultipleFiles = async (req, res, next) => {
    try {
        const files = await MultipleFile.find();
        res.status(200).send(files)
    } catch(error) {
        res.status(400).send(error.message);
    }
}

const fileSizeFormatter = (bytes, decimal) => {
    if (bytes === 0) {
        return '0 Bytes';
    }
    const dm = decimal || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'YB', 'ZB'];
    const index = Math.floor(Math.log(bytes) / Math.log(1000));
    return parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + '-' + sizes[index];
}

module.exports = {
    singleFileUpload,
    multipleFileUpload,
    getallSingleFiles,
    getallmultipleFiles
}