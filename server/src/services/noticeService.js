const Notice = require('../models/Notice');
const Company = require('../models/Company');

const createNotice = async (companyId, noticeDate) => {
  const company = await Company.findById(companyId);
  if (!company) {
    const error = new Error('Company not found');
    error.statusCode = 404;
    throw error;
  }

  const notice = new Notice({
    companyId,
    noticeDate
  });

  return await notice.save();
};

const getNotices = async () => {
  return await Notice.find()
    .populate('companyId', 'name role')
    .sort({ noticeDate: -1 });
};

module.exports = {
  createNotice,
  getNotices
};
