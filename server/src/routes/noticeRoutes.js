const express = require('express');
const { createNotice, getNotices, deleteNotice } = require('../controllers/noticeController');
const { protect, admin } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', getNotices);
router.post('/', protect, admin, createNotice);
router.delete('/:id', protect, admin, deleteNotice);

module.exports = router;
