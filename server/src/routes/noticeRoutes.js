const express = require('express');
const { createNotice, getNotices } = require('../controllers/noticeController');
const { protect, admin } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', getNotices);
router.post('/', protect, admin, createNotice);

module.exports = router;
