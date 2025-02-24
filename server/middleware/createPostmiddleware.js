const multer = require('multer');
const path = require('path');

// Define storage configuration for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Specify the directory where images will be stored
        cb(null, 'uploads/');  // Make sure to create this folder or use any directory you prefer
    },
    filename: (req, file, cb) => {
        // Keep the original file name but sanitize it (remove special characters, spaces, etc.)
        const fileExtension = path.extname(file.originalname);
        const originalName = path.basename(file.originalname, fileExtension); // Get the base name without extension
        const sanitizedFileName = originalName.replace(/[^a-zA-Z0-9_-]/g, '_'); // Replace non-alphanumeric characters with underscores
        cb(null, sanitizedFileName + fileExtension);  // Use the sanitized file name with its original extension
    },
});

// Multer instance with the storage configuration
const upload = multer({
    storage: storage
}).single('image');  // Accept a single file named 'image'

module.exports = upload;
