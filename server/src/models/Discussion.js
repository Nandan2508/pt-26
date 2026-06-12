const mongoose = require('mongoose');

const discussionSchema = new mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
      required: true,
    },
    type: {
      type: String,
      enum: ['oa', 'interview'],
      required: true,
    },
  },
  { timestamps: true }
);

const Discussion = mongoose.model('Discussion', discussionSchema);

module.exports = Discussion;
