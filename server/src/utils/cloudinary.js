const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Configure Cloudinary with hardcoded credentials from user
cloudinary.config({
  cloud_name: 'dn0qyi39b',
  api_key: '382663443963811',
  api_secret: '6qKqt8haVfThPB6pymBNrg4CGbE'
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'pt-26-jd-docs',
    allowed_formats: ['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png'],
    resource_type: 'auto'
  },
});

const upload = multer({ storage: storage });

module.exports = { cloudinary, upload };
