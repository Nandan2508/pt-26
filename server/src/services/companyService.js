const Company = require('../models/Company');

const createCompany = async (data) => {
  const company = new Company(data);
  return await company.save();
};

const updateCompany = async (id, data) => {
  const company = await Company.findById(id);
  if (!company) {
    const error = new Error('Company not found');
    error.statusCode = 404;
    throw error;
  }
  
  Object.assign(company, data);
  return await company.save();
};

const deleteCompany = async (id) => {
  const company = await Company.findById(id);
  if (!company) {
    const error = new Error('Company not found');
    error.statusCode = 404;
    throw error;
  }
  
  await company.deleteOne();
  return { message: 'Company removed successfully' };
};

const getCompany = async (idOrSlug) => {
  let query = {};
  
  if (idOrSlug.match(/^[0-9a-fA-F]{24}$/)) {
    query = { _id: idOrSlug };
  } else {
    query = { slug: idOrSlug };
  }

  const company = await Company.findOne(query);
  if (!company) {
    const error = new Error('Company not found');
    error.statusCode = 404;
    throw error;
  }
  
  return company;
};

const getCompanies = async ({ search, role, type, branch, normalCutoff, internalCutoff, page = 1, limit = 10 }) => {
  const query = {};

  if (search) {
    query.name = { $regex: search, $options: 'i' };
  }

  if (role) {
    query.role = { $regex: role, $options: 'i' };
  }

  if (type) {
    query.type = { $regex: type, $options: 'i' };
  }

  if (branch) {
    query.branches = { $in: [branch, /^all$/i] }; 
  }

  if (normalCutoff !== undefined) {
    query.normalCutoff = { $gte: Number(normalCutoff) };
  }

  if (internalCutoff !== undefined) {
    query.internalCutoff = { $gte: Number(internalCutoff) };
  }

  const skip = (page - 1) * limit;
  
  const companies = await Company.aggregate([
    { $match: query },
    {
      $lookup: {
        from: 'notices',
        localField: '_id',
        foreignField: 'companyId',
        as: 'notices'
      }
    {
      $addFields: {
        roleNoticeDate: {
          $cond: {
            if: { $gt: [{ $size: "$notices" }, 0] },
            then: { $add: [ { $max: "$notices.noticeDate" }, 86399000 ] },
            else: "$createdAt"
          }
        }
      }
    },
    {
      $group: {
        _id: "$name",
        roles: { $push: "$$ROOT" },
        latestNoticeDate: { $max: "$roleNoticeDate" },
        createdAt: { $max: "$createdAt" }
      }
    },
    { $sort: { latestNoticeDate: -1, _id: -1 } },
    { $skip: skip },
    { $limit: Number(limit) },
    { $unwind: "$roles" },
    { $replaceRoot: { newRoot: "$roles" } },
    { $project: { notices: 0, roleHasNotice: 0, roleNoticeDate: 0 } }
  ]);

  const total = await Company.countDocuments(query);
  const distinctNames = await Company.distinct('name', query);
  const totalCompaniesCount = distinctNames.length;

  return {
    companies,
    total,
    totalCompaniesCount,
    page: Number(page),
    pages: Math.ceil(totalCompaniesCount / limit),
  };
};

module.exports = {
  createCompany,
  updateCompany,
  deleteCompany,
  getCompany,
  getCompanies,
};
