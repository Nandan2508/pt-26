const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    interviewLink: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Resource = mongoose.model('Resource', resourceSchema);

module.exports = ;
