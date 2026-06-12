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

const getCompanies = async ({ search, role, type, branch, page = 1, limit = 10 }) => {
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
    query.branches = { $in: [branch] }; // Checks if 'branch' is in the branches array
  }

  const skip = (page - 1) * limit;
  const companies = await Company.find(query).skip(skip).limit(Number(limit)).sort({ createdAt: -1 });
  const total = await Company.countDocuments(query);

  return {
    companies,
    total,
    page: Number(page),
    pages: Math.ceil(total / limit),
  };
};

module.exports = {
  createCompany,
  updateCompany,
  deleteCompany,
  getCompany,
  getCompanies,
};
