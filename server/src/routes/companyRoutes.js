const express = require('express');
const {
  createCompany,
  updateCompany,
  deleteCompany,
  getCompany,
  getCompanies,
} = require('../controllers/companyController');
const { protect, admin } = require('../middlewares/authMiddleware');

const router = express.Router();

// Public routes
router.get('/', getCompanies);
router.get('/:id', getCompany);

// Admin only routes
router.post('/', protect, admin, createCompany);
router.put('/:id', protect, admin, updateCompany);
router.delete('/:id', protect, admin, deleteCompany);

module.exports = router;
