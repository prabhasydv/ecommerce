const multer = require("multer");

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./uploads")
    },
    filename:(req,file,cb)=>{
        cb(null,`image-${Date.now()}.${file.originalname}`)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
        cb(null, true);
    } else {
        cb(new Error('Only images and videos are allowed'));
    }
};


const upload = multer({ dest: 'uploads/', fileFilter });


module.exports = upload