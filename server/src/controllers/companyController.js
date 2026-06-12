const companyService = require('../services/companyService');

const createCompany = async (req, res) => {
  try {
    const companyData = { ...req.body };
    if (req.file) {
      companyData.jdLink = req.file.path;
    }
    const company = await companyService.createCompany(companyData);
    res.status(201).json({ message: 'Company created successfully', company });
  } catch (error) {
    const statusCode = error.statusCode || 400;
    res.status(statusCode).json({ message: error.message });
  }
};

const updateCompany = async (req, res) => {
  try {
    const companyData = { ...req.body };
    if (req.file) {
      companyData.jdLink = req.file.path;
    }
    const company = await companyService.updateCompany(req.params.id, companyData);
    res.status(200).json({ message: 'Company updated successfully', company });
  } catch (error) {
    const statusCode = error.statusCode || 400;
    res.status(statusCode).json({ message: error.message });
  }
};

const deleteCompany = async (req, res) => {
  try {
    const result = await companyService.deleteCompany(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    const statusCode = error.statusCode || 400;
    res.status(statusCode).json({ message: error.message });
  }
};

const getCompany = async (req, res) => {
  try {
    const company = await companyService.getCompany(req.params.id);
    res.status(200).json(company);
  } catch (error) {
    const statusCode = error.statusCode || 400;
    res.status(statusCode).json({ message: error.message });
  }
};

const getCompanies = async (req, res) => {
  try {
    const result = await companyService.getCompanies(req.query);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Server Error' });
  }
};

module.exports = {
  createCompany,
  updateCompany,
  deleteCompany,
  getCompany,
  getCompanies,
};
