const eligibilityService = require('../services/eligibilityService');

const simulateEligibility = async (req, res) => {
  try {
    const { internalCGPA, branch } = req.body;
    
    if (!internalCGPA || !branch) {
      return res.status(400).json({ message: 'internalCGPA and branch are required' });
    }

    const result = await eligibilityService.simulateEligibility(Number(internalCGPA), branch);
    
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Server Error' });
  }
};

module.exports = {
  simulateEligibility
};
