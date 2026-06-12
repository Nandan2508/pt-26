const noticeService = require('../services/noticeService');

const createNotice = async (req, res) => {
  try {
    const { companyId, noticeDate } = req.body;
    
    if (!companyId || !noticeDate) {
      return res.status(400).json({ message: 'companyId and noticeDate are required' });
    }

    const notice = await noticeService.createNotice(companyId, noticeDate);
    
    res.status(201).json({ message: 'Notice created successfully', notice });
  } catch (error) {
    const statusCode = error.statusCode || 400;
    res.status(statusCode).json({ message: error.message });
  }
};

const getNotices = async (req, res) => {
  try {
    const notices = await noticeService.getNotices();
    res.status(200).json(notices);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Server Error' });
  }
};

const deleteNotice = async (req, res) => {
  try {
    const { id } = req.params;
    await noticeService.deleteNotice(id);
    res.status(200).json({ message: 'Notice deleted successfully' });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ message: error.message || 'Server Error' });
  }
};

module.exports = {
  createNotice,
  getNotices,
  deleteNotice
};
