const Company = require('../models/Company');

const simulateEligibility = async (internalCGPA, branch) => {
  const companies = await Company.find().sort({ createdAt: -1 });
  
  const eligible = [];
  const nearEligible = [];
  const notEligible = [];

  companies.forEach(company => {
    const companyBranches = company.branches.map(b => b.toUpperCase());
    const isBranchAllowed = companyBranches.includes(branch.toUpperCase()) || companyBranches.includes('ALL');
    
    // Check if the branch is allowed
    if (!isBranchAllowed) {
      notEligible.push({ company, reason: 'Branch not allowed' });
      return;
    }

    const cutoff = company.internalCutoff;
    const difference = cutoff - internalCGPA;

    if (internalCGPA >= cutoff) {
      eligible.push({ company, reason: 'Meets criteria' });
    } else if (difference <= 0.30) {
      nearEligible.push({ company, reason: `Short by ${difference.toFixed(2)} CGPA` });
    } else {
      notEligible.push({ company, reason: `Short by ${difference.toFixed(2)} CGPA` });
    }
  });

  return {
    eligible,
    nearEligible,
    notEligible
  };
};

module.exports = {
  simulateEligibility
};
