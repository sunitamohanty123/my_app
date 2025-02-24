const multer = require('multer');
const path = require('path');

// Define storage configuration for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Specify the directory where images will be stored
        cb(null, 'uploads/');  // Make sure to create this folder or use any directory you prefer
    },
    filename: (req, file, cb) => {
        // Generate a unique filename using timestamp and a random number
        const fileExtension = path.extname(file.originalname);
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension);  // Example: image-123456789.jpg
    },
});

// Multer instance with the storage configuration
// const upload = multer({
//     storage: storage
// }).single('image');  // Accept a single file named 'image'
const upload = multer({ storage: storage }).fields([
    { name: 'logo', maxCount: 1 },
    { name: 'coverphoto', maxCount: 1 }
]);
// const upload = (req, res, next) => {
//     const fileFields = req.body;
//     console.log(fileFields);

//     // Check if the file field is 'image' (for single upload) or 'logo'/'coverphoto' (for multiple)
//     if (fileFields.image) {
//         // If 'image' field exists, use single file upload
//         multer({ storage: storage }).single('image')(req, res, next);
//     } else if (fileFields.logo || fileFields.coverphoto) {
//         // If 'logo' or 'coverphoto' fields exist, use fields upload
//         multer({ storage: storage }).fields([
//             { name: 'logo', maxCount: 1 },
//             { name: 'coverphoto', maxCount: 1 }
//         ])(req, res, next);
//     } else {
//         // If no file field exists, pass the request to the next middleware
//         next();
//     }
// };


module.exports = upload;
